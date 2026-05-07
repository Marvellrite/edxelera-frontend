import Link from "next/link";

const publicLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/about-us", label: "About" },
  { href: "/contact-us", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-8">
        <Link href="/" className="text-lg font-semibold text-zinc-950">
          EdXelera
        </Link>
        <div className="flex items-center gap-5 text-sm font-medium text-zinc-600">
          {publicLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-zinc-950">
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
