# Role Access Strategy

EdXelera currently needs three roles: `student`, `instructor`, and `admin`.
The frontend already has the right foundation for this:

- `src/shared/types/auth-role.ts` defines the role union.
- `src/shared/utils/permissions.ts` defines role ranking.
- `src/shared/constants/routes.ts` separates student, instructor, and admin route roots.
- `src/shared/constants/permissions.ts` maps protected route prefixes to the minimum role.
- `src/stores/auth-store.ts` has a small auth state shape with `userId` and `role`.

The recommendation is to keep role handling centralized and route-driven, then let features consume
the resulting user context.

## Recommended Model

Use one canonical role field everywhere in the frontend:

- `student`
- `instructor`
- `admin`

Treat the backend as the source of truth for role assignment. The frontend should never decide that
a user has become an instructor or admin by itself. It should only read role information from trusted
backend responses, validated session endpoints, or verified token claims.

For access checks, keep the current rank model:

- `student` can access student areas.
- `instructor` can access instructor areas and student-level areas if the product allows that.
- `admin` can access admin areas and lower-ranked areas if the product allows that.

This rank model is useful for simple route protection, but it should not replace specific
permissions forever. If EdXelera later needs fine-grained actions like `course.publish`,
`course.review`, `user.suspend`, or `analytics.export`, add a permission layer on top of roles.

## Route Ownership

Keep the route structure role-aware:

| Role | Route Root | Purpose |
| --- | --- | --- |
| Student | `/home` | Learner dashboard, enrolled courses, profile, settings |
| Instructor | `/instructor` | Instructor dashboard, course creation, course management |
| Admin | `/admin` | User management, platform settings, moderation, reporting |

Do not mix role dashboards under one route with conditional rendering. For example, avoid making
`/dashboard` render completely different applications for different roles. Separate route roots make
navigation, layouts, analytics, testing, and access control easier to reason about.

Shared public pages such as `/`, `/explore`, `/course/[slug]`, and auth routes should stay outside
role-specific route roots.

## Authentication Flow

After sign-in, the app should resolve the authenticated user before deciding where to send them.

Recommended redirect behavior:

| User State | Destination |
| --- | --- |
| Not authenticated | `/auth` |
| Authenticated student | `/home` |
| Authenticated instructor | `/instructor` |
| Authenticated admin | `/admin` |
| Authenticated but onboarding incomplete | `/auth/onboarding` or the relevant onboarding step |
| Authenticated but role missing/unknown | Safe fallback page with a support-oriented message |

The frontend should avoid hardcoding a single post-login destination. Instead, use a shared
`getDefaultRouteForRole` style decision in the route helper layer so all auth flows behave the same
way.

## Route Protection

Use two layers of protection.

### 1. Server Boundary

Protect role route roots as early as possible. In this Next.js app, that means expanding the current
`src/proxy.ts` matcher beyond `/home/:path*` to include:

- `/home/:path*`
- `/instructor/:path*`
- `/admin/:path*`

The server boundary should at minimum reject unauthenticated users. If role claims are available in
a trusted cookie or token, it can also reject users whose role is below the route requirement.

If the proxy cannot safely know the role, it should only check authentication and leave role
validation to the app shell after fetching the current user.

### 2. App/Layout Boundary

Each protected route root should have a role-aware layout:

- `src/app/home/layout.tsx`
- `src/app/instructor/layout.tsx`
- `src/app/admin/layout.tsx`

Each layout should use shared auth/permission utilities and redirect users who do not meet the
minimum role. The layouts should remain thin and delegate UI to shared layout components.

This keeps page files focused on composition and prevents every page from repeating the same role
checks.

## Permission Rules

Keep the source of route access in one shared constant. The existing `protectedRouteRoles` object is
a good start, but it should be treated as prefix-based route policy.

Recommended policy:

| Route Prefix | Minimum Role |
| --- | --- |
| `/home` | `student` |
| `/instructor` | `instructor` |
| `/admin` | `admin` |

Use `hasRoleAccess(currentRole, requiredRole)` for hierarchical checks.

For actions inside pages, avoid checking route strings. Use named checks instead:

- Can manage users
- Can create course
- Can publish course
- Can view platform analytics
- Can enroll in course

Those can start as simple role checks, then evolve into permission-based checks later without
rewriting every component.

## Navigation

Navigation should be role-derived, not manually duplicated in layouts.

Recommended behavior:

- Students see student navigation.
- Instructors see instructor navigation.
- Admins see admin navigation.
- Shared links like profile, settings, and sign out can live in a shared account menu.

If admins should be able to switch between admin and instructor/student views, make that an explicit
workspace switcher rather than silently mixing all links into one sidebar.

## Data Fetching

Use the authenticated current-user endpoint as the runtime source for role-aware UI.

The current-user response should include at least:

- user id
- display name
- email
- role
- onboarding status
- account status

Do not rely only on client store state for protected screens. Client state is useful for rendering,
but protected route decisions should be backed by a fresh or cached server-state query.

React Query is a good fit for this app:

- `useCurrentUser` for current session data
- route layouts can block or redirect while user data is loading
- feature screens can reuse the same query data

## Backend Contract

The backend should enforce all role checks. Frontend role guards improve UX, but they are not a
security boundary by themselves.

The frontend should expect these backend guarantees:

- Sign-in returns enough session information to identify the user.
- The current-user endpoint returns the authoritative role.
- Protected backend endpoints reject unauthorized users.
- Role changes are performed only through backend-controlled admin flows.
- Token refresh preserves the current role and account state.

## Error And Edge States

Plan these states explicitly:

- User is signed in but role is unknown.
- User role changed while they are active.
- User account is disabled.
- User tries to visit a route below or above their role.
- Current-user request fails.
- Token exists but is expired or invalid.

Suggested handling:

- Unknown role: redirect to a safe account/status page or sign out with a clear message.
- Insufficient role: redirect to the user's default role home, or show a 403 page.
- Expired token: refresh if possible, otherwise redirect to `/auth`.
- Disabled account: redirect to an account-disabled page or show a blocking state.

## Suggested Rollout

1. Keep `AuthRole` as the canonical frontend role type.
2. Add a single role-to-home-route helper.
3. Expand protected route policy to cover `/home`, `/instructor`, and `/admin`.
4. Add role-aware layouts for each protected route root.
5. Make auth redirects use role-to-home-route logic after sign-in and onboarding.
6. Make navigation consume role-specific navigation constants.
7. Keep backend services feature-scoped and let backend endpoints enforce authorization.
8. Add focused tests for route policy, default redirects, and permission helpers.

## Recommended Principle

Roles should answer, "Which workspace does this user belong to?"

Permissions should answer, "What can this user do inside that workspace?"

For now, the three roles are enough. Build the frontend around them, but keep the boundaries clean so
the app can grow into finer permissions without a large rewrite.
