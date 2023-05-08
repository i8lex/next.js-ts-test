import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { API_URL, LIMIT as limit } from "../../services";

interface User {
  id: number;
  name: string;
}

interface GetAllUsers {
  users: User[];
  total: number;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!!id) {
      const page = Number(id);
      const skip = page * limit;
      console.log(page);
      console.log(skip);
      const getAllUsers = async (): Promise<GetAllUsers> => {
        const response = await axios.get(API_URL, {
          params: {
            limit,
            skip,
          },
        });
        setUsers(response.data.users);
        setTotal(response.data.total);
      };

      getAllUsers().catch((error) => {
        console.error(error);
      });
    }
  }, [id]);

  console.log(total);
  console.log(users);
  return (
    <div>
      <></>
    </div>
  );
}
