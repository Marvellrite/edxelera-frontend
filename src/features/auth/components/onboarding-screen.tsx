"use client";

import Image from "next/image";
import type { FormEvent } from "react";
import { useState } from "react";
import {
  onboardingSchema,
  type OnboardingFormValues,
} from "@/features/auth/schemas/onboarding-schema";

type OnboardingFormErrors = Partial<Record<keyof OnboardingFormValues, string>>;

const initialValues: OnboardingFormValues = {
  role: "student",
  learningGoal: "",
};

const roleOptions = [
  {
    value: "student",
    title: "Student",
    description: "Learn with courses, assessments, and progress tracking.",
  },
  {
    value: "instructor",
    title: "Instructor",
    description: "Create courses and manage learner experiences.",
  },
] as const;

export function OnboardingScreen() {
  const [values, setValues] = useState<OnboardingFormValues>(initialValues);
  const [errors, setErrors] = useState<OnboardingFormErrors>({});

  function updateValue<TKey extends keyof OnboardingFormValues>(
    key: TKey,
    value: OnboardingFormValues[TKey],
  ) {
    setValues((currentValues) => ({ ...currentValues, [key]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [key]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = onboardingSchema.safeParse(values);

    if (!result.success) {
      setErrors(
        result.error.issues.reduce<OnboardingFormErrors>((nextErrors, issue) => {
          const field = issue.path[0];

          if (field === "role" || field === "learningGoal") {
            nextErrors[field] = issue.message;
          }

          return nextErrors;
        }, {}),
      );
      return;
    }

    setErrors({});
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-[#181818] md:bg-[#f8f9ff] lg:grid lg:grid-cols-2">
      <BackgroundPanel className="absolute inset-0 hidden md:block lg:hidden" />
      <BackgroundPanel className="relative hidden min-h-screen lg:block" />

      <section
        className="relative z-10 flex min-h-screen justify-center px-4 py-12 md:items-center md:px-6 md:py-10 lg:bg-[#f8f9ff] lg:px-8"
        aria-label="Onboarding"
      >
        <div className="w-full max-w-[396px] md:max-w-[469px] md:rounded-[20px] md:bg-[#f3f3f3] md:p-6 lg:max-w-[444px]">
          <div className="flex justify-center">
            <Image
              src="/logos/edxelera-logo-light.svg"
              alt="EdXelera"
              width={215}
              height={40}
              priority
              className="h-10 w-[215px]"
            />
          </div>

          <form
            noValidate
            onSubmit={handleSubmit}
            className="mt-[47px] flex flex-col gap-6 md:mt-10"
          >
            <div className="flex flex-col gap-3">
              <h1 className="text-[32px] font-semibold leading-10 tracking-normal text-[#0c0c0c] md:font-medium md:leading-[48px] md:text-[#040506]">
                Welcome to EdXelera
              </h1>
              <p className="text-base leading-6 text-[#646464]">
                Personalize your account so we can shape the right learning
                experience for you.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <fieldset className="flex flex-col gap-3">
                <legend className="text-base leading-6 text-[#181818] md:font-medium md:text-[#040506]">
                  How will you use EdXelera?
                </legend>
                <div className="grid gap-3">
                  {roleOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`cursor-pointer rounded-xl border bg-white p-4 transition-colors md:rounded-[20px] ${
                        values.role === option.value
                          ? "border-[#003dae]"
                          : "border-[#cbcbcb] md:border-transparent"
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={option.value}
                        checked={values.role === option.value}
                        onChange={() => updateValue("role", option.value)}
                        className="sr-only"
                      />
                      <span className="block text-base font-semibold leading-6 text-[#0c0c0c]">
                        {option.title}
                      </span>
                      <span className="mt-1 block text-sm leading-5 text-[#646464]">
                        {option.description}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.role ? (
                  <p className="text-sm leading-5 text-red-600">{errors.role}</p>
                ) : null}
              </fieldset>

              <div className="flex w-full flex-col gap-2">
                <label
                  htmlFor="learningGoal"
                  className="text-base leading-6 text-[#181818] md:font-medium md:text-[#040506]"
                >
                  Learning Goal
                </label>
                <textarea
                  id="learningGoal"
                  name="learningGoal"
                  value={values.learningGoal}
                  placeholder="Tell us what you want to achieve"
                  aria-invalid={Boolean(errors.learningGoal)}
                  aria-describedby={
                    errors.learningGoal ? "learningGoal-error" : undefined
                  }
                  onChange={(event) =>
                    updateValue("learningGoal", event.currentTarget.value)
                  }
                  className={`min-h-28 w-full resize-none rounded-xl border bg-white p-4 text-base leading-6 text-[#181818] outline-none placeholder:text-[#979797] md:border-transparent md:text-sm md:font-medium md:leading-[21px] md:text-[#040506] md:placeholder:text-[#6e6e6e] ${
                    errors.learningGoal
                      ? "border-red-500 md:border-red-500"
                      : "border-[#cbcbcb]"
                  }`}
                />
                {errors.learningGoal ? (
                  <p
                    id="learningGoal-error"
                    className="text-sm leading-5 text-red-600"
                  >
                    {errors.learningGoal}
                  </p>
                ) : null}
              </div>
            </div>

            <button
              type="submit"
              className="flex h-14 w-full items-center justify-center rounded-xl bg-[#003dae] px-6 py-4 text-base font-semibold leading-6 text-white transition-colors hover:bg-[#00349a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003dae]"
            >
              Continue
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

function BackgroundPanel({ className }: { className: string }) {
  return (
    <div className={className} aria-hidden="true">
      <Image
        src="/images/auth-background.png"
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 to-black/40" />
    </div>
  );
}
