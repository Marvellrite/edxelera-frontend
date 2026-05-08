"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import type { ChangeEvent, ReactNode } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input";
import { AuthBackgroundPanels } from "@/features/auth/components/auth-background-panels";
import { AuthLogo } from "@/features/auth/components/auth-logo";
import {
  onboardingSchema,
  type OnboardingFormValues,
} from "@/features/auth/schemas/onboarding-schema";
import { updateOnboardingProfile } from "@/features/auth/services/auth.service";

const initialValues: OnboardingFormValues = {
  bio: "",
  location: "",
  secondaryLocation: "",
  learningInterest: "",
};

const learningOptions = [
  "Software development",
  "Product design",
  "Data analytics",
  "Business strategy",
] as const;

export function OnboardingScreen() {
  const router = useRouter();
  const profileImageInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: initialValues,
  });

  async function submitOnboarding(values: OnboardingFormValues) {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      await updateOnboardingProfile({
        ...values,
        image: profileImage,
      });
      router.push("/home");
    } catch {
      setErrorMessage("Unable to save your profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function openProfileImagePicker() {
    profileImageInputRef.current?.click();
  }

  function handleProfileImageChange(event: ChangeEvent<HTMLInputElement>) {
    setProfileImage(event.target.files?.[0] ?? null);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white md:bg-[#f8f9ff] lg:grid lg:grid-cols-2">
      <AuthBackgroundPanels />

      <section
        className="relative z-10 flex min-h-screen justify-center px-4 py-16 md:items-center md:px-6 md:py-10 lg:bg-[#f8f9ff] lg:px-8"
        aria-label="Onboarding"
      >
        <div className="w-full max-w-[396px] md:max-w-[469px] md:rounded-[20px] md:bg-[#f3f3f3] md:p-6 lg:max-w-[444px]">
          <div className="flex justify-center">
            <AuthLogo />
          </div>

          <form
            noValidate
            onSubmit={handleSubmit(submitOnboarding)}
            className="mt-10 flex flex-col gap-6 md:mt-8 lg:mt-10"
          >
            <h1 className="text-[32px] font-semibold leading-10 tracking-normal md:font-medium md:leading-[48px]">
              Welcome to Edxelera
            </h1>

            <div className="flex flex-col items-center gap-10">
              <p className="w-full text-base leading-6">
                Let&apos;s set things up so your learning experience feels just
                right for you
              </p>

              <button
                type="button"
                onClick={openProfileImagePicker}
                disabled={isLoading}
                className="flex size-[88px] items-center justify-center rounded-full bg-[#ebebeb] transition-colors hover:bg-[#e2e2e2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003dae]"
                aria-label="Upload profile photo"
              >
                <GalleryAddIcon />
              </button>
              <input
                ref={profileImageInputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleProfileImageChange}
                aria-label="Select profile photo"
              />
              {profileImage ? (
                <p className="-mt-8 text-center text-sm leading-5 text-muted-foreground">
                  {profileImage.name}
                </p>
              ) : null}

              <div className="flex w-full flex-col gap-4">
                <InputField
                  id="bio"
                  label="Bio"
                  leading={<UserIcon />}
                  placeholder="Say something about yourself..."
                  error={errors.bio?.message}
                  {...register("bio")}
                />

                <InputField
                  id="location"
                  label="Location"
                  leading={<LocationIcon />}
                  placeholder="Enter your location"
                  error={errors.location?.message}
                  {...register("location")}
                />

                <InputField
                  id="secondaryLocation"
                  label="Location"
                  leading={<LocationIcon />}
                  placeholder="Enter your location"
                  error={errors.secondaryLocation?.message}
                  {...register("secondaryLocation")}
                />

                <LearningSelect
                  error={errors.learningInterest?.message}
                  register={register("learningInterest")}
                />
              </div>

              <div className="flex w-full flex-col gap-2">
                <Button type="submit" fullWidth isLoading={isLoading}>
                  Continue
                </Button>
                <button
                  type="button"
                  className="flex h-14 w-full items-center justify-center rounded-xl px-6 text-base font-semibold leading-6 transition-colors hover:bg-[#f3f6ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003dae]"
                >
                  Skip for now
                </button>
              </div>
            </div>

            {errorMessage ? (
              <p className="text-center text-sm leading-5 text-destructive">
                {errorMessage}
              </p>
            ) : null}
          </form>
        </div>
      </section>
    </main>
  );
}

function LearningSelect({
  error,
  register,
}: {
  error?: string;
  register: UseFormRegisterReturn<"learningInterest">;
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label
        htmlFor="learningInterest"
        className="text-base font-normal leading-6"
      >
        What would you like to learn?
      </label>
      <div className="relative flex h-14 w-full items-center rounded-xl border border-[#cbcbcb] bg-white transition-colors focus-within:border-[#003dae] focus-within:ring-2 focus-within:ring-[#003dae]">
        <select
          id="learningInterest"
          className="h-full w-full appearance-none rounded-xl bg-transparent px-4 pr-12 text-base leading-6 outline-none"
          {...register}
        >
          <option value="">Select</option>
          {learningOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span
          className="pointer-events-none absolute right-4 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center"
          aria-hidden="true"
        >
          <ChevronDownIcon />
        </span>
      </div>
      {error ? <p className="text-sm leading-5">{error}</p> : null}
    </div>
  );
}

function IconSvg({ children }: { children: ReactNode }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function UserIcon() {
  return (
    <IconSvg>
      <path
        d="M12 12C14.3012 12 16.1667 10.1345 16.1667 7.83333C16.1667 5.53215 14.3012 3.66667 12 3.66667C9.69882 3.66667 7.83333 5.53215 7.83333 7.83333C7.83333 10.1345 9.69882 12 12 12Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M4.875 20.3333C4.875 17.125 8.06667 14.5417 12 14.5417C15.9333 14.5417 19.125 17.125 19.125 20.3333"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </IconSvg>
  );
}

function LocationIcon() {
  return (
    <IconSvg>
      <path
        d="M12 13.4292C13.7241 13.4292 15.1217 12.0316 15.1217 10.3075C15.1217 8.58343 13.7241 7.18584 12 7.18584C10.2759 7.18584 8.87833 8.58343 8.87833 10.3075C8.87833 12.0316 10.2759 13.4292 12 13.4292Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3.62001 8.49C5.59001 -0.17 18.42 -0.16 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.39001 20.54C5.63001 17.88 2.47001 13.57 3.62001 8.49Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </IconSvg>
  );
}

function GalleryAddIcon() {
  return (
    <IconSvg>
      <path
        d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M13 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M16 5H22"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M19 2V8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M2.67 18.95L7.6 15.64C8.39 15.11 9.53 15.17 10.24 15.78L10.57 16.07C11.35 16.74 12.61 16.74 13.39 16.07L17.55 12.5C18.33 11.83 19.59 11.83 20.37 12.5L22 13.9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </IconSvg>
  );
}

function ChevronDownIcon() {
  return (
    <IconSvg>
      <path
        d="M19.92 8.95L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.08 8.95"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </IconSvg>
  );
}
