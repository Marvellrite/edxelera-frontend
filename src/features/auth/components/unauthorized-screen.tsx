"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function UnautorizedScreen() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-neutral-950 to-neutral-900 text-white">
      <div className="max-w-md w-full text-center space-y-6">
        

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">
            Access Restricted
          </h1>
          <p className="text-sm text-neutral-400">
            This area is protected. Your current permissions don&apos;t allow entry.
          </p>
        </div>

        {/* Hint box */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 text-sm text-neutral-300">
          If you believe this is a mistake, contact your administrator or switch to an authorized account.
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 rounded-xl bg-white text-black py-2.5 font-medium hover:bg-neutral-200 transition"
          >
            Go Back
          </button>

          <Button
            onClick={() => router.push("/")}
            className="flex items-center justify-center gap-2 rounded-xl border border-neutral-700 py-2.5 text-neutral-200 hover:bg-neutral-800 transition"
          >

            Home
          </Button>
        </div>

        {/* subtle footer vibe */}
        <p className="text-xs text-neutral-600 pt-4">
          Error code: 403 — permission mismatch detected
        </p>
      </div>
    </div>
  );
}