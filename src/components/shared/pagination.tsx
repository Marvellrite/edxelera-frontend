import { Button } from "@/components/ui/button";

type PaginationProps = {
  page: number;
};

export function Pagination({ page }: PaginationProps) {
  return (
    <nav className="flex items-center gap-3" aria-label="Pagination">
      <Button variant="secondary">Previous</Button>
      <span className="text-sm">Page {page}</span>
      <Button variant="secondary">Next</Button>
    </nav>
  );
}
