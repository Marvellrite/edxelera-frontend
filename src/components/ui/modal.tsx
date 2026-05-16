import type { ReactNode } from "react";

type ModalProps = {
  title: string;
  children: ReactNode;
};

export function Modal({ title, children }: ModalProps) {
  return (
    <section className="rounded-lg border border-border bg-card text-card-foreground p-6 shadow-sm">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
