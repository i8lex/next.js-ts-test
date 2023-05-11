import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";
import axios from "axios";

import Image from "next/image";

type User ={
  id: number;
  firstName: string;
  lastName: string;
  address: Address;
  image: string;
}

type Address ={
  address: string;
  city: string;
  postalCode: string;
  state: string;
}

type GetUser ={
  user: User;
}

export default function User() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const router = useRouter();

  const { id: page } = router.query;

  useEffect(() => {
    if (page) {
      const getUser = async (): Promise<GetUser> => {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/${page}`
        );
        setUser(response.data);
        return { user: response.data };
      };

      getUser().catch((error) => {
        console.error(error);
      });
    }
  }, [page]);

  return (
    <>
      {!!user && (
        <div className="flex items-center justify-center h-screen w-full drop-shadow-md ">
          <div className="max-w-7xl w-full flex drop-shadow-md gap-6">
            <div >
              <Image
                priority="normal"
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                width={600}
                height={600}
                className="h-30 w-30 flex-1"
              />
            </div>
            <div className=" flex flex-2 gap-4 flex-col justify-end content-start">
              <p className="text-8xl font-large text-gray-900">{user.firstName}</p>
              <p className="text-8xl font-large text-gray-900 mb-16">{user.lastName}</p>
              <p className="text-5xl font-medium text-gray-400">{`${user.address.address},`}</p>
              <p className="text-5xl font-medium text-gray-400">{`${user.address.postalCode} ${user.address.city}`}</p>
              <p className="text-5xl font-medium text-gray-400">{`${user.address.state}, USA`}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
