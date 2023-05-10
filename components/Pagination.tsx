import Link from "next/link";


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
            key={pageNumber}

          >
            <Link className="w-10" href={`/users?page=${pageNumber}`}><span className={
              pageNumber - 1 === currentPage
                  ? "w-10 p-2 border rounded-md bg-violet-200"
                  : "p-2 border rounded-md hover:bg-violet-100"
            }>{pageNumber}</span></Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
