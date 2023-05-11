import { MdSearch } from "react-icons/md";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import { GetUsers } from "../type";

export default function SearchWidget() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState<null | number>(null);
  const [widgetIsActive, setWidgetIsActive] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();
  const limit: number = 10;
  const skip: number = 0;
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

  useEffect(() => {
    const getUsers = async (): Promise<GetUsers> => {
      if (query.length < 1 && widgetIsActive) {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BASE_API_URL as string,
          config
        );
        setResults(response.data.users);
        setSelectedResult(-1);
        return;
      }
      if (query.length > 0 && widgetIsActive) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/search?q=${query}`
        );
        setResults(response.data.users);
        setSelectedResult(-1);
      }
      return;
    };
    getUsers().catch(console.error);
  }, [query, widgetIsActive]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event && event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedResult((prev) =>
        prev !== null ? Math.min(prev + 1, results.length - 1) : null
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();

      setSelectedResult((prev) =>
        prev !== null ? Math.max(prev - 1, 0) : null
      );
    } else if (event.key === "Enter" && selectedResult !== null) {
      event.preventDefault();
      const user = results[selectedResult] as { id: string };
      router.push(`/user/${user.id}`);
    }
  };

  return (
    <div className="flex justify-center mb-8">
      <div className="flex gap-2 justify-center mb-3 relative w-52">
        <div className="relative flex-1 w-52">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              setTimeout(() => {
                setWidgetIsActive(false);
              }, 100);
            }}
            onFocus={() => {
              setWidgetIsActive(true);
            }}
            name="search"
            placeholder="search users"
            className="border rounded-md pl-10 pr-2 py-2 text-base text-gray-600"
            ref={inputRef}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MdSearch className="text-gray-400 font-medium text-2xl text-md" />
          </div>
        </div>

        {!!results.length && widgetIsActive && (
          <ul className="absolute w-52 z-10 top-full left-0 right-0 bg-white border rounded-md overflow-hidden">
            {results.map(({ id, firstName, lastName }, index) => (
              <li key={id}>
                <Link
                  href={`/user/${id}`}
                  className={clsx(
                    "block px-4 py-2 hover:bg-gray-100 border rounded-md",
                    selectedResult === index && "bg-gray-100"
                  )}
                >
                  {firstName} {lastName}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
