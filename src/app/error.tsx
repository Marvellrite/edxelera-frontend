"use client";

import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-20 text-center">
      <h1 className="text-3xl font-semibold">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-md">
        The page could not be rendered. Try again to reload this route.
      </p>
      <button
        type="button"
        onClick={() => unstable_retry()}
        className="mt-6 rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium"
      >
        Try again
      </button>
    </div>
  );
}
