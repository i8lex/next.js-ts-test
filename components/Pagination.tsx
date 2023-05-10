import Link from "next/link";
import React from "react";

export default function Pagination({
  currentPage,
  total,
}: {
  currentPage: number;
  total: number;
}) {
  const totalPages  = Number(total) / Number(process.env.NEXT_PUBLIC_BASE_LIMIT);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => ++i);

  return (
    <nav>
      <ul className="flex gap-2 justify-center">
        {pageNumbers.map((pageNumber) => (
          <li
              className="inline-block w-10"
            key={pageNumber}

          >
            <Link className="w-10" href={`/users?page=${pageNumber}`}><span className={
              pageNumber - 1 === currentPage
                  ? "p-2 block text-center border rounded-md bg-violet-200 text-base"
                  : "p-2 border block text-center rounded-md hover:bg-violet-100 text-base"
            }>{pageNumber}</span></Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
