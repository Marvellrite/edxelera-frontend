import { BackButton } from "@/components/shared/back-button";
const termsSections = [
  {
    title: "1. Conditions of use",
    body: "By creating an account, purchasing a course, or using our services, you agree to comply with and be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use the platform.",
  },
  {
    title: "2. Intellectual properties",
    body: "By creating an account, purchasing a course, or using our services, you agree to comply with and be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use the platform.",
  },
  {
    title: "2. Intellectual properties",
    body: "By creating an account, purchasing a course, or using our services, you agree to comply with and be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use the platform.",
  },
  {
    title: "2. Intellectual properties",
    body: "By creating an account, purchasing a course, or using our services, you agree to comply with and be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use the platform.",
  },
  {
    title: "2. Intellectual properties",
    body: "By creating an account, purchasing a course, or using our services, you agree to comply with and be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use the platform.",
  },
];

export function TermsOfServiceScreen() {
  return (
    <main className="min-h-screen bg-card text-foreground">
      <section className="mx-auto flex w-full max-w-[430px] flex-col items-start gap-6 px-4 pb-36 pt-6">
        <header className="relative flex h-10 w-full items-center justify-center">
          <BackButton
            label="Go back"
            className="absolute left-0 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-neutral-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <BackArrowIcon />
          </BackButton>
          <h1 className="text-[32px] font-semibold leading-10">
            Terms of Service
          </h1>
        </header>

        <p className="text-sm leading-[18px] text-muted-foreground">
          Last updated on 4 October 2025
        </p>

        <p className="w-full text-base leading-6 text-neutral-800">
          Welcome to Edxelera. By accessing or using our platform, you agree to
          the following Terms of Service. Please read them carefully.
        </p>

        {termsSections.map((section, index) => (
          <article
            key={`${section.title}-${index}`}
            className="flex w-full flex-col gap-2"
          >
            <h2 className="text-base font-semibold leading-6 text-foreground">
              {section.title}
            </h2>
            <p className="text-base leading-6 text-neutral-800">
              {section.body}
            </p>
          </article>
        ))}
      </section>

      <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-card/10 via-card to-card">
        <div className="mx-auto flex w-full max-w-[430px] gap-4 px-4 pb-8 pt-6">
          <button
            type="button"
            className="inline-flex h-14 flex-1 items-center justify-center rounded-xl border border-primary bg-card px-6 py-4 text-base font-semibold leading-6 text-primary transition-colors hover:bg-blue-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Decline
          </button>
          <button
            type="button"
            className="inline-flex h-14 flex-1 items-center justify-center rounded-xl bg-primary px-6 py-4 text-base font-semibold leading-6 text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Accept
          </button>
        </div>
      </div>
    </main>
  );
}

function BackArrowIcon() {
  return (
    <svg
      width="32"
      height="30"
      viewBox="0 0 32 30"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M23 15H9"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
      />
      <path
        d="M15 9L9 15L15 21"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
