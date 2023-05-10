import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";
import axios from "axios";

import Image from "next/image";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  address: Address;
  image: string;
}

interface Address {
  address: string;
  city: string;
  postalCode: string;
  state: string;
}

interface GetUser {
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
        <div className="flex ">
          <div className="flex">
            <div>
              <Image
                priority="high"
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                width={350}
                height={350}
                className="h-30 w-30 mb-6"
              />
            </div>
            <div>
              <p>{user.firstName}</p>
              <p>{user.lastName}</p>
              <p>{`${user.address.address},`}</p>
              <p>{`${user.address.postalCode} ${user.address.city}`}</p>
              <p>{`${user.address.state}, USA`}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
