import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-20 text-center">
      <p className="text-sm font-medium uppercase tracking-wide">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold">
        Page not found
      </h1>
      <p className="mt-3 max-w-md">
        The page you are looking for does not exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium"
      >
        Go home
      </Link>
    </main>
  );
}
