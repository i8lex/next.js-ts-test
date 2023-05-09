import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MdSearch } from "react-icons/md";
import Link from "next/link";
import "tailwindcss/tailwind.css";
import axios, { AxiosRequestConfig } from "axios";

import { API_URL, LIMIT as limit } from "../../services";
import Pagination from "../../components/Pagination";
import SearchWidget from "../../components/SearchWidget";

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
  const { id } = router.query;

  useEffect(() => {
    if (!!id) {
      const page = Number(id - 1);
      const skip = page * limit;
      console.log(page);
      console.log(skip);

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
        const response = await axios.get(API_URL, config);
        setUsers(response.data.users);
        setTotal(response.data.total);
        setCurrentPage(page);
      };

      getAllUsers().catch((error) => {
        console.error(error);
      });
    }
  }, [id]);

  console.log(total);
  console.log(users);
  console.log(currentPage);
  return (
    <div className="p-8 flex flex-col">
      <SearchWidget />
      <div className="mb-32">
        <ul className="grid gap-6 grid-cols-5 grid-rows-2">
          {users.map(({ id, firstName, lastName, image }) => (
            <li
              key={id}
              className="py-4 flex flex-col justify-center items-center border rounded-lg p-8 drop-shadow-md hover:saturate-200 hover:scale-105"
            >
              <img className="h-10 w-10 rounded-full mb-3" src={image} alt="" />
              <div className="ml-3 flex justify-between gap-2">
                <p className="text-sm font-medium text-gray-900">{firstName}</p>
                <p className="text-sm font-medium text-gray-900">{lastName}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Pagination currentPage={currentPage} total={total} />
    </div>
  );
}
