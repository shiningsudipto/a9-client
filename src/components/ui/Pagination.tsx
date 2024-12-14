import React from "react";

interface PaginationProps {
  active: number; // The currently active page
  totalPages: number; // Total number of pages
  onPageChange: (page: number) => void; // Function to handle page changes
}

const Pagination: React.FC<PaginationProps> = ({
  active,
  totalPages,
  onPageChange,
}) => {
  const adjacentPages = 2;

  const pages: JSX.Element[] = [];
  const startPage = Math.max(1, active - adjacentPages);
  const endPage = Math.min(totalPages, active + adjacentPages);

  // Generate pages
  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        key={i}
        className={`rounded-md p-2 font-bold ${
          active === i ? "bg-green-500 text-white" : "bg-transparent"
        }`}
        onClick={() => onPageChange(i)}
      >
        {i}
      </button>
    );
  }

  // Add ellipsis and first page button if necessary
  if (startPage > 1) {
    pages.unshift(
      <button
        key="ellipsis-start"
        className="rounded-none bg-transparent"
        disabled
      >
        ...
      </button>,
      <button
        key={1}
        className={`rounded-none ${
          active === 1 ? "bg-green-500 text-white" : "bg-transparent"
        }`}
        onClick={() => onPageChange(1)}
      >
        {1}
      </button>
    );
  }

  // Add ellipsis and last page button if necessary
  if (endPage < totalPages) {
    pages.push(
      <button
        key="ellipsis-end"
        className="rounded-none bg-transparent"
        disabled
      >
        ...
      </button>,
      <button
        key={totalPages}
        className={`${
          active === totalPages ? "bg-green-500 text-white" : "bg-transparent"
        }`}
        onClick={() => onPageChange(totalPages)}
      >
        {totalPages}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <button
        className="flex items-center gap-2 bg-secondary text-white font-semibold py-2 px-6 rounded-md"
        onClick={() => onPageChange(active - 1)}
        disabled={active === 1}
      >
        Previous
      </button>
      <div className="flex items-center gap-2">{pages}</div>
      <button
        className="flex items-center gap-2 bg-secondary text-white font-semibold py-2 px-6 rounded-md"
        onClick={() => onPageChange(active + 1)}
        disabled={active === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
