import { Input } from "@/shared/components/ui/input";

type SearchBarProps = {
  placeholder?: string;
};

export function SearchBar({ placeholder = "Search" }: SearchBarProps) {
  return <Input type="search" placeholder={placeholder} />;
}
