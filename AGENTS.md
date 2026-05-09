<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes. APIs, conventions, and file structure may differ from older
Next.js versions or training data. Before writing Next.js code, read the relevant guide in
`node_modules/next/dist/docs/` and heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# EdXelera Agent Guide

This file defines project-specific guidance for AI agents and contributors working on the EdXelera
frontend.

## Project Overview

EdXelera Frontend is the Next.js application for the EdXelera LMS platform. It provides the public
site, authentication flows, student learning experience, instructor tools, and admin dashboard.

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

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint
- pnpm

## Architecture Rules

- Keep `src/app` thin.
- Use `src/app` for routing, layouts, loading states, error boundaries, and page composition.
- Move feature-specific UI and logic into `src/features`.
- Put shared reusable UI primitives in `src/components/ui`.
- Put shared layout components in `src/components/layout`.
- Put global infrastructure utilities in `src/lib`.
- Put global reusable hooks in `src/hooks`.
- Put global shared types in `src/types`.
- Keep static assets in `public`.
- Prefer `@/` imports for source files because `tsconfig.json` maps `@/*` to `./src/*`.

## Folder Ownership

### `src/app`

Owns routing and route-level composition.

Use this folder for:

- `layout.tsx`
- `page.tsx`
- `loading.tsx`
- `error.tsx`
- `not-found.tsx`
- Route groups
- Dynamic route segments

Avoid placing business logic directly in route files.

### `src/features`

Owns feature-specific code.

Use this folder for:

- Feature components
- Feature hooks
- Feature service functions
- Feature schemas
- Feature constants
- Feature utilities
- Feature types

### `src/components`

Owns reusable components that are not specific to one feature.

Use this folder for:

- UI primitives
- Shared layout components
- Shared product components
- Reusable form components

### `src/lib`

Owns global infrastructure and framework-agnostic utilities.

Use this folder for:

- Route constants
- Permission helpers
- Auth helpers
- Validation utilities
- General utilities

### `src/stores`

Owns global client state only. Prefer local state or feature-local state when the state does not
need to be shared across the app.

## API Rules

- Do not hardcode API URLs inside components or feature logic.
- Use the centralized Axios client from `src/shared/services/api-client`.
- All backend communication must go through `src/features/*/services`.
- Feature service modules should import DTO request/response contracts from `src/features/*/dto`.
- Keep DTOs as the source of truth for backend payloads. Do not duplicate API request/response
  shapes in feature `types` folders.
- Use React Query for all asynchronous server-state management:
  - data fetching
  - caching
  - mutations
  - synchronization
  - optimistic updates
  - background refetching

- Prefer React Query hooks inside feature hooks such as:
  - `useCourses`
  - `useEnrollCourse`
  - `useAssessmentAttempt`

- Do not call Axios directly inside UI components.
- Generic/shared UI components must never contain backend fetching logic.
- Keep business rules out of Next.js route handlers unless intentionally implementing a backend-for-frontend (BFF) layer.
- Keep request and response DTOs explicit and strongly typed.
- Reuse shared API response types where possible.
- Use interceptors in the centralized Axios client for:
  - authentication headers
  - token refresh
  - request logging
  - error normalization

- Avoid duplicate API logic across features.
- Keep API services focused and feature-scoped.

## Component Rules

- Prefer Server Components by default.
- Use Client Components only when browser APIs, event handlers, local interactive state, or client
  hooks are required.
- Keep components small and composable.
- Move repeated UI patterns into shared components.
- Keep feature-specific components inside their feature folder.
- Avoid prop drilling through many layers; introduce composition or a focused state boundary when
  needed.

## State Management

Use the smallest state scope that solves the problem:

- Local React state for component-only state
- Feature-local hooks for feature workflows
- Server-state tooling for backend data when added to the project
- Global stores only for cross-app client state

Do not store server data in a global client store unless there is a clear reason.

## Styling Rules

- Use Tailwind CSS for styling.
- Keep global styles in `src/app/globals.css`.
- Use the semantic color tokens exposed through `src/app/globals.css` when styling components.
  Prefer Tailwind classes such as `bg-background`, `text-foreground`, `bg-primary`,
  `text-primary-foreground`, `bg-card`, `text-card-foreground`, `border-border`, `bg-muted`,
  `text-muted-foreground`, `ring-ring`, `bg-destructive`, `bg-success`, and `bg-warning` over
  raw hex values or arbitrary color classes.
- Use palette color classes such as `blue-600`, `neutral-300`, or `red-600` only when no semantic
  token accurately describes the intended UI role. Before introducing a hardcoded color value,
  check `src/app/globals.css`, `src/styles/theme.css`, and `src/styles/root.css` for an existing
  semantic or palette variable that already represents that color.
- Hardcoded color values such as `#003dae`, `rgb(...)`, `hsl(...)`, or arbitrary Tailwind color
  values are allowed only when the intended color is not already represented by an existing
  semantic color token or palette variable.
- Extract repeated visual patterns into components.
- Avoid inline styles unless a runtime value requires them.
- Maintain consistent spacing, typography, and interaction states.

## Naming Conventions

| Item | Convention | Example |
| --- | --- | --- |
| Components | PascalCase exports; file style should be consistent per folder | `CourseCard` |
| Hooks | `use` prefix | `useCourses` |
| Services | Feature name plus `service` | `course-service.ts` |
| Schemas | Feature name plus `schema` | `course-schema.ts` |
| Feature types | `types.ts` inside the feature | `src/features/courses/types.ts` |
| Global types | Descriptive file names | `src/types/course.ts` |
| Constants | Descriptive constants grouped by feature | `course.constants.ts` |

## Git Conventions

Use descriptive branch names:

- `feature/course-player`
- `fix/auth-redirect`
- `refactor/dashboard-layout`
- `docs/folder-structure`

Use clear commit prefixes when possible:

- `feat:`
- `fix:`
- `refactor:`
- `docs:`
- `chore:`

## Performance Guidelines

- Avoid unnecessary Client Components.
- Lazy load heavy UI only when it improves the user experience.
- Use `next/image` for image optimization when rendering app images.
- Avoid unnecessary re-renders in interactive components.
- Keep route-level loading and error states intentional.

## Forbidden Practices

- Do not place business logic in `page.tsx`.
- Do not fetch directly from shared UI components.
- Do not duplicate API types across multiple folders.
- Do not bypass feature service modules for backend calls.
- Do not create large catch-all utility files.
- Do not use `any` without a clear reason.
- Do not move configuration files into `src`.
- Do not move `public` into `src`.

## Instructions for AI Agents

Before creating or editing code:

- Read the relevant files first.
- Check whether similar functionality already exists.
- Follow the folder structure in [docs/folder-structure.md](./docs/folder-structure.md).
- Read relevant Next.js docs from `node_modules/next/dist/docs/` before changing framework-specific
  routing, rendering, configuration, caching, or data-fetching behavior.

When generating code:

- Prefer strict TypeScript.
- Reuse existing components and helpers.
- Keep changes scoped to the user request.
- Avoid unnecessary abstractions.
- Update documentation when changing project structure or conventions.

When unsure:

- Prefer consistency with the existing codebase.
- Prefer small, readable changes.
- Ask only when the decision cannot be safely inferred from local context.
