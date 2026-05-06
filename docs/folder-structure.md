# EdXelera Frontend Folder Structure

This document describes the intended frontend folder structure for the EdXelera LMS platform.
The project uses Next.js App Router, TypeScript, React, and Tailwind CSS.

## Current Project Shape

The application is configured as a root-level Next.js project that keeps application code inside
`src/`.

```txt
edxelera-frontend/
├── docs/
│   └── folder-structure.md
├── public/
├── src/
│   └── app/
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── postcss.config.mjs
└── tsconfig.json
```

## Architecture Principles

EdXelera should use a feature-based frontend architecture. Routes should stay thin, shared UI
should be reusable, and feature-specific logic should live close to the feature that owns it.

The frontend is responsible for:

- UI rendering
- Route composition
- Client-side interactions
- API communication
- Form validation
- Authentication state
- Role-aware navigation and route protection

The backend service is responsible for:

- Business logic
- Database operations
- Authentication verification
- Analytics
- Payments
- Notifications

## Recommended Target Structure

As the application grows, keep source code under `src/` and keep framework configuration at the
project root.

```txt
edxelera-frontend/
├── docs/
├── public/
│   ├── icons/
│   ├── images/
│   ├── illustrations/
│   └── logos/
├── src/
│   ├── app/
│   ├── components/
│   ├── config/
│   ├── features/
│   ├── hooks/
│   ├── lib/
│   ├── stores/
│   ├── styles/
│   └── types/
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

## `src/app`

The `src/app` directory owns routing and page composition through the Next.js App Router.
Keep route files focused on layout, data handoff, metadata, and rendering feature components.

```txt
src/app/
├── (public)/
│   ├── page.tsx
│   ├── about-us/
│   │   └── page.tsx
│   ├── contact-us/
│   │   └── page.tsx
│   ├── explore/
│   │   └── page.tsx
│   ├── faqs/
│   │   └── page.tsx
│   └── terms-and-services/
│       └── page.tsx
├── admin/
├── auth/
├── course/
├── home/
├── instructor/
├── favicon.ico
├── globals.css
├── layout.tsx
├── loading.tsx
├── error.tsx
└── not-found.tsx
```

### Public Routes

Use a route group for public pages when they should share a layout without changing the URL.

```txt
src/app/(public)/
├── page.tsx
├── about-us/
│   └── page.tsx
├── contact-us/
│   └── page.tsx
├── explore/
│   └── page.tsx
├── faqs/
│   └── page.tsx
└── terms-and-services/
    └── page.tsx
```

### Authentication Routes

```txt
src/app/auth/
├── page.tsx
├── sign-up/
│   └── page.tsx
├── verify-email/
│   └── page.tsx
├── forgotten-password/
│   └── page.tsx
├── reset-password/
│   └── page.tsx
└── onboarding/
    └── page.tsx
```

### Student Routes

```txt
src/app/home/
├── layout.tsx
├── page.tsx
├── explore/
│   └── page.tsx
├── my-courses/
│   └── page.tsx
├── my-profile/
│   └── page.tsx
└── settings/
    └── page.tsx
```

### Course Routes

```txt
src/app/course/
└── [slug]/
    ├── page.tsx
    ├── complete/
    │   └── page.tsx
    └── learn/
        └── [moduleSlug]/
            ├── page.tsx
            └── assessment/
                └── attempt/
                    └── [attemptId]/
                        ├── page.tsx
                        └── result/
                            └── page.tsx
```

### Instructor Routes

```txt
src/app/instructor/
├── layout.tsx
├── page.tsx
└── courses/
    ├── page.tsx
    └── add-course/
        ├── page.tsx
        └── preview/
            └── page.tsx
```

### Admin Routes

```txt
src/app/admin/
├── layout.tsx
├── page.tsx
├── users/
│   └── page.tsx
├── courses/
│   └── page.tsx
├── transactions/
│   └── page.tsx
└── notifications/
    └── page.tsx
```

## `src/features`

The `src/features` directory is the main business-facing layer. Each feature owns its local UI,
hooks, service functions, schemas, constants, utilities, and types.

```txt
src/features/
├── admin/
├── analytics/
├── assessments/
├── auth/
├── cart/
├── courses/
├── instructor/
├── learning/
├── notifications/
└── profile/
```

Example feature structure:

```txt
src/features/courses/
├── components/
│   ├── course-card.tsx
│   ├── course-header.tsx
│   ├── course-list.tsx
│   ├── course-progress.tsx
│   └── course-sidebar.tsx
├── constants/
│   └── course.constants.ts
├── hooks/
│   ├── use-course-details.ts
│   ├── use-course-progress.ts
│   ├── use-courses.ts
│   └── use-enroll-course.ts
├── schemas/
│   └── course-schema.ts
├── services/
│   └── course-service.ts
├── utils/
│   └── course.utils.ts
└── types.ts
```

## `src/components`

The `src/components` directory is for reusable components that are not owned by one feature.

```txt
src/components/
├── forms/
├── layout/
├── shared/
└── ui/
```

### `src/components/ui`

Use this folder for pure UI primitives.

```txt
src/components/ui/
├── badge.tsx
├── button.tsx
├── dropdown.tsx
├── input.tsx
├── modal.tsx
├── spinner.tsx
└── tabs.tsx
```

### `src/components/layout`

Use this folder for shared shell and layout components.

```txt
src/components/layout/
├── dashboard-layout.tsx
├── footer.tsx
├── navbar.tsx
├── protected-layout.tsx
└── sidebar.tsx
```

### `src/components/shared`

Use this folder for cross-feature components that contain light product behavior.

```txt
src/components/shared/
├── course-grid.tsx
├── empty-state.tsx
├── pagination.tsx
├── search-bar.tsx
└── user-avatar.tsx
```

### `src/components/forms`

Use this folder for reusable form abstractions.

```txt
src/components/forms/
├── form-error.tsx
├── form-field.tsx
├── password-input.tsx
└── rich-text-editor.tsx
```

## `src/lib`

The `src/lib` directory contains application infrastructure and framework-agnostic utilities.

```txt
src/lib/
├── api/
│   ├── client.ts
│   ├── endpoints.ts
│   ├── interceptors.ts
│   └── query-client.ts
├── auth.ts
├── constants.ts
├── permissions.ts
├── routes.ts
├── utils.ts
└── validators.ts
```

## `src/hooks`

Use this folder for global reusable hooks that are not tied to a specific feature.

```txt
src/hooks/
├── use-debounce.ts
├── use-local-storage.ts
├── use-media-query.ts
├── use-pagination.ts
└── use-toast.ts
```

## `src/stores`

Use this folder for global state stores. Prefer feature-local state when the state belongs to only
one feature.

```txt
src/stores/
├── auth-store.ts
├── notification-store.ts
├── theme-store.ts
└── ui-store.ts
```

## `src/types`

Use this folder for global shared TypeScript types.

```txt
src/types/
├── api.ts
├── assessment.ts
├── auth.ts
├── course.ts
├── index.ts
└── user.ts
```

## `src/config`

Use this folder for application configuration objects.

```txt
src/config/
├── dashboard.ts
├── env.ts
├── navigation.ts
├── permissions.ts
└── site.ts
```

## `src/styles`

Use this folder for optional shared styling files. Global CSS that Next.js imports from the root
layout should stay in `src/app/globals.css`.

```txt
src/styles/
├── animations.css
└── typography.css
```

## `public`

The `public` directory stays at the project root and stores static assets served directly by
Next.js.

```txt
public/
├── icons/
├── images/
├── illustrations/
├── logos/
└── favicon.ico
```

## API Integration

EdXelera should communicate with backend services through feature service modules. Do not place
core business logic in Next.js route handlers.

```ts
// src/features/courses/services/course-service.ts
import { apiClient } from "@/lib/api/client";

export const getCourses = async () => {
  return apiClient.get("/courses");
};
```

## Route Protection

Use a layered route protection strategy:

- Proxy or middleware-level redirects for broad access rules
- Layout-level guards for role-specific sections
- Component-level permission checks for individual actions

Protected areas should rely on shared permission utilities from `src/lib/permissions.ts` and route
constants from `src/lib/routes.ts`.

## Naming Conventions

Use consistent names across the codebase:

| Item | Convention | Example |
| --- | --- | --- |
| Components | PascalCase file or kebab-case file, consistently per folder | `CourseCard.tsx` or `course-card.tsx` |
| Hooks | Kebab-case file, `use` prefix for function | `use-courses.ts` |
| Services | Feature name plus `service` | `course-service.ts` |
| Schemas | Feature name plus `schema` | `course-schema.ts` |
| Types | `types.ts` inside a feature, descriptive files globally | `src/features/courses/types.ts` |
| Constants | Feature name plus `constants` | `course.constants.ts` |

## Recommended Rules

- Keep `src/app` thin.
- Co-locate feature-specific logic inside `src/features`.
- Put reusable primitives in `src/components/ui`.
- Put backend communication inside `services/`.
- Keep global utilities in `src/lib`.
- Prefer `@/` imports for source files because `tsconfig.json` maps `@/*` to `./src/*`.
- Avoid deep component nesting when a feature can be split into smaller components.
- Keep framework configuration files at the project root.
