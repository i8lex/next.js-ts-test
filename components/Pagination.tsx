import Link from "next/link";
import React from "react";
import clsx from "clsx";
import { PaginationProps } from "../type";

export default function Pagination({ currentPage, total }: PaginationProps) {
  const limit: number = 10;
  const totalPages = Number(total) / Number(limit);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => ++i);

  return (
    <nav>
      <div className="flex gap-2 justify-center">
        {pageNumbers.map((pageNumber) => (
          <div className="inline-block w-10" key={pageNumber}>
            <Link className="w-10" href={`/users?page=${pageNumber}`}>
              <span
                className={clsx(
                  "p-2 block text-center border rounded-md text-base",
                  pageNumber - 1 === currentPage
                    ? "bg-violet-200"
                    : "hover:bg-violet-100"
                )}
              >
                {pageNumber}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
}
