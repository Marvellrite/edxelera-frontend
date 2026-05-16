"use client";

import { useState } from "react";

export function usePagination(initialPage = 1) {
  const [page, setPage] = useState(initialPage);

  return {
    page,
    nextPage: () => setPage((currentPage) => currentPage + 1),
    previousPage: () => setPage((currentPage) => Math.max(1, currentPage - 1)),
    setPage,
  };
}
