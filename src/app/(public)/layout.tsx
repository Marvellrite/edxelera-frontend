import type { ReactNode } from "react";
import { Footer } from "@/shared/components/layout/footer";
import { Navbar } from "@/shared/components/layout/navbar";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col bg-zinc-50">{children}</main>
      <Footer />
    </>
  );
}
