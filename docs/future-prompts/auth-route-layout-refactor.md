# Future Prompt: Auth Route Layout Refactor

Use this prompt when the auth tablet and desktop views are ready to be implemented or revisited.

```txt
Review the auth routes and refactor their repeated layout structure safely.

Context:
- The app uses Next.js 16 App Router.
- Before changing route layouts, read the relevant Next.js docs in `node_modules/next/dist/docs/`.
- Keep `src/app` thin and route-focused.
- Keep auth UI and workflow logic inside `src/features/auth`.
- Reuse shared UI from `src/shared/components`.
- Current auth screens include:
  - `src/app/auth/page.tsx`
  - `src/app/auth/sign-up/page.tsx`
  - `src/app/auth/verify-email/page.tsx`
  - `src/app/auth/forgotten-password/page.tsx`
  - `src/app/auth/reset-password/page.tsx`
  - `src/app/auth/onboarding/page.tsx`
- Relevant auth components include:
  - `src/features/auth/components/auth-background-panels.tsx`
  - `src/features/auth/components/auth-logo.tsx`
  - `src/features/auth/components/login-screen.tsx`
  - `src/features/auth/components/sign-up-screen.tsx`
  - `src/features/auth/components/onboarding-screen.tsx`
  - `src/features/auth/components/verify-email-screen.tsx`
  - `src/features/auth/components/forgotten-password-screen.tsx`

Important design context:
- The auth routes are intended to support tablet and desktop views.
- Some tablet/desktop states are not fully implemented yet.
- Because of that, not every auth route currently uses `AuthBackgroundPanels`.
- Do not assume routes without `AuthBackgroundPanels` should stay that way permanently.
- Do not force every auth route into one identical layout if their final responsive designs differ.

Goal:
- Determine whether auth layout duplication should be handled with:
  - a shared `src/app/auth/layout.tsx`,
  - route groups with separate layouts,
  - a feature-level shell component such as `src/features/auth/components/auth-shell.tsx`,
  - or a combination of these.
- Prefer the smallest refactor that improves reuse without blocking route-specific tablet/desktop designs.

What to investigate:
- Which auth screens should share the two-column/tablet-desktop visual shell.
- Which screens should remain simple centered flows.
- Whether `AuthBackgroundPanels` belongs in a route layout or a feature-level `AuthShell`.
- Whether `AuthLogo` can be centralized without losing route-specific sizing and spacing.
- Whether login, sign-up, and onboarding can share:
  - the outer `<main>` layout,
  - the background panel,
  - the form section wrapper,
  - the card/container wrapper,
  - and the logo placement.
- Whether verify-email and forgotten-password need a separate simple auth shell.

Implementation guidance:
- Keep route files in `src/app/auth` as composition only.
- Keep form state, mutations, validation, and UI details in `src/features/auth`.
- If using route groups, preserve the existing URLs.
- If using an `AuthShell` component, make it accept only stable layout props such as:
  - `children`
  - `ariaLabel`
  - `backgroundImageSrc`
  - `logoClassName`
  - layout variant if truly needed
- Avoid route-aware logic in shared layout components unless there is a strong reason.
- Avoid moving client-only form logic into server route layouts.
- Keep responsive behavior explicit and test mobile, tablet, and desktop widths.

Acceptance criteria:
- No auth route loses its current mobile behavior.
- Tablet and desktop layouts are implemented or prepared cleanly.
- Shared layout code reduces duplication without hiding route-specific design needs.
- `AuthBackgroundPanels` is used where the final tablet/desktop design requires it.
- `AuthLogo` placement and sizing remain correct per route.
- `src/app` stays thin.
- Auth business and form logic stays inside `src/features/auth`.
- Lint and build pass.
```
