import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";
import axios from "axios";


import Image from 'next/image';


interface User {
    id: number;
    firstName: string;
    lastName: string;
    image: string;
}

interface GetUser {
    user: User;
}

export default function User() {
    const [user, setUser] = useState({})
    const router = useRouter();

    const {id: page} = router.query
    // const page = Number(id)
    console.log(router.query)


    useEffect(() => {
        if (!!page) {
            // const config: {
            //     string: string;
            //     params: { id: number };
            // } = {
            //     params: {
            //         id: page,
            //     },
            //     string: "",
            // };

            const getUser = async (): Promise<GetUser> => {
                const response = await axios.get((`${process.env.NEXT_PUBLIC_BASE_API_URL}/${page}` as string));
                setUser(response.data);

                return {user: response.data};
            };

            getUser().catch((error) => {
                console.error(error);
            });
        }
        console.log(user)
    }, [page]);


    return (
        <></>
    );
}
