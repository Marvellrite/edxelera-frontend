import Link from "next/link";

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

export default function TermsAndServicesPage() {
  return (
    <section className="mx-auto flex w-full max-w-[430px] flex-col items-start gap-6 bg-white px-4 pb-16 pt-6">
      <header className="relative flex h-10 w-full items-center justify-center">
        <Link
          href="/"
          aria-label="Go back"
          className="absolute left-0 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003dae]"
        >
          <BackArrowIcon />
        </Link>
        <h1 className="text-[32px] font-semibold leading-10">
          Terms of Service
        </h1>
      </header>

      <p className="text-sm leading-[18px] opacity-70">
        Last updated on 4 October 2025
      </p>

      <p className="w-full text-base leading-6">
        Welcome to Edxelera. By accessing or using our platform, you agree to
        the following Terms of Service. Please read them carefully.
      </p>

      {termsSections.map((section, index) => (
        <article key={`${section.title}-${index}`} className="flex w-full flex-col gap-2">
          <h2 className="text-base font-semibold leading-6">{section.title}</h2>
          <p className="text-base leading-6">{section.body}</p>
        </article>
      ))}
    </section>
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
