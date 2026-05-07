# Implemented Auth Screens

These auth screens currently have dedicated feature components implemented in
`src/features/auth/components`.

| Route | Screen component | Source file |
| --- | --- | --- |
| `/auth` | `LoginScreen` | `src/features/auth/components/login-screen.tsx` |
| `/auth/sign-up` | `SignUpScreen` | `src/features/auth/components/sign-up-screen.tsx` |
| `/auth/onboarding` | `OnboardingScreen` | `src/features/auth/components/onboarding-screen.tsx` |
| `/auth/verify-email` | `VerifyEmailScreen` | `src/features/auth/components/verify-email-screen.tsx` |

## Auth Placeholder Routes

These auth routes exist, but currently render `RoutePlaceholder` instead of a
dedicated auth feature screen.

| Route | Page file |
| --- | --- |
| `/auth/forgotten-password` | `src/app/auth/forgotten-password/page.tsx` |
| `/auth/reset-password` | `src/app/auth/reset-password/page.tsx` |
