import { MdSearch } from "react-icons/md";
import "tailwindcss/tailwind.css";
import axios from "axios";
import { API_URL } from "../services";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SearchWidget() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState<null | number>(null);
  const [selectedResultId, setSelectedResultId] = useState(0);
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (query.length >= 1) {
      const fetchResults = async () => {
        const response = await axios.get(`${API_URL}/search?q=${query}`);
        setResults(response.data.users);
      };
      fetchResults().catch((error) => console.error(error));
    } else {
      setResults([]);
    }
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  // const { id } = results[selectedResult];

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setSelectedResult((prev) =>
          prev === null ? 0 : Math.min(prev + 1, results.length - 1)
        );

        // setSelectedResultId(id);
        break;
      case "ArrowUp":
        event.preventDefault();
        setSelectedResult((prev) =>
          prev === null ? results.length - 1 : Math.max(prev - 1, 0)
        );

        // setSelectedResultId(id);
        break;
      case "Enter":
        event.preventDefault();
        if (selectedResult !== null) {
          const user = results[selectedResult];
          router.push(`/user/${user.id}`);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (inputRef.current && selectedResult !== null) {
      inputRef.current.setSelectionRange(0, query.length);
    }
  }, [selectedResult]);

  console.log(results[selectedResult]);
  console.log(results);
  console.log(selectedResult);

  return (
    <div className="flex justify-center mb-8">
      <div className="flex gap-2 justify-center mb-3 relative w-52">
        <div className="relative flex-1 w-52">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={() => setResults([])}
            name="search"
            placeholder="search users"
            className=" border rounded-md pl-10 pr-2 py-2 text-sm text-gray-600"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MdSearch className="text-gray-400 font-medium text-2xl text-md" />
          </div>
        </div>

        {!!results.length && (
          <ul className="absolute w-52 z-10 top-full left-0 right-0 bg-white border rounded-md overflow-hidden">
            {results.map((user) => (
              <li key={user.id}>
                <Link
                  href={`/user/${user.id}`}
                  className={
                    user.id === selectedResultId
                      ? "block px-4 py-2 hover:bg-gray-100 border rounded-md bg-gray-100"
                      : "block px-4 py-2 hover:bg-gray-100 border rounded-md "
                  }
                >
                  {user.firstName} {user.lastName}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
