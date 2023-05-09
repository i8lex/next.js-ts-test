import Link from "next/link";
import "tailwindcss/tailwind.css";

export default function Pagination({ currentPage, total }) {
  const limit = 10;
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
                ? "active py-1 px-2 border rounded-md"
                : "p-2 border rounded-md"
            }
          >
            <Link href={`/users/${pageNumber}`}>{pageNumber}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
