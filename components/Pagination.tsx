import Link from "next/link";
import "tailwindcss/tailwind.css";
import { LIMIT as limit } from "../services";

export default function Pagination({ currentPage, total }) {
  const totalPages = total / limit;
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex gap-2 justify-center">
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={
              pageNumber - 1 === currentPage
                ? "active py-1 px-2 border rounded-md bg-violet-200"
                : "p-2 border rounded-md hover:bg-violet-100"
            }
          >
            <Link href={`/users/${pageNumber}`}>{pageNumber}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}