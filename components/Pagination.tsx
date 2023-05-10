import Link from "next/link";
import "tailwindcss/tailwind.css";

export default function Pagination({
  currentPage,
  total,
}: {
  currentPage: number;
  total: number;
}) {
  const totalPages  = Number(total) / Number(process.env.NEXT_PUBLIC_BASE_LIMIT);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => ++i);

  // const pageNumbers = [];
  // for (let i = 1; i <= totalPages; i++) {
  //   pageNumbers.push(i);
  // }

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
            <Link href={`/users?page=${pageNumber}`}>{pageNumber}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
