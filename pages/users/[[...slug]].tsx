import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";
import axios from "axios";
import Pagination from "../../components/Pagination";
import SearchWidget from "../../components/SearchWidget";
import Image from "next/image";
import Link from "next/link";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
}

interface GetAllUsers {
  users: User[];
  total: number;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const page = router.query.page;
  const pageToNum = Number(page);
  const limit = 10;

  useEffect(() => {
    if (!!page) {
      const pageNum: number = pageToNum - 1;
      const skip = pageNum * limit;

      const config: {
        string: string;
        params: { limit: number; skip: number };
      } = {
        params: {
          limit,
          skip,
        },
        string: "",
      };

      const getAllUsers = async (): Promise<GetAllUsers> => {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BASE_API_URL as string,
          config
        );
        setUsers(response.data.users);
        setTotal(response.data.total);
        setCurrentPage(pageNum);
        return { users: response.data.users, total: response.data.total };
      };

      getAllUsers().catch((error) => {
        console.error(error);
      });
    }
  }, [page]);

  // @ts-ignore
  return (
    <div className="p-8 flex flex-col">
      <SearchWidget />
      <div className="mb-12">
        <ul className="grid gap-6 grid-cols-5 grid-rows-2">
          {users.map(({ id, firstName, lastName, image }) => (
              <li
                  key={id}
                  className="py-4 flex flex-col justify-center items-center border rounded-lg p-8 drop-shadow-md hover:saturate-200 hover:scale-105"
              >
                <Link href={`/user/${id}`} className="flex flex-wrap items-center flex-col">
                  <Image
                      priority="normal"
                      src={image}
                      alt={`${firstName} ${lastName}`}
                      width={150}
                      height={150}
                      className="h-30 w-30 mb-6 self-center flex-1"
                  />
                  <div className="ml-3 flex flex-wrap items-center gap-2 flex-1">
                    <p className="text-base font-medium text-gray-900 flex-shrink-0">
                      {firstName}
                    </p>
                    <p className="text-base font-medium text-gray-900 flex-shrink-0">
                      {lastName}
                    </p>
                  </div>
                </Link>
              </li>

          ))}
        </ul>
      </div>
      <Pagination currentPage={currentPage} total={total} />
    </div>
  );
}
