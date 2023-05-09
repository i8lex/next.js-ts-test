import { MdSearch } from "react-icons/md";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SearchWidget() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState<null | number>(null);
  const [widgetIsActive, setWidgetIsActive] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length < 1) {
        setResults([]);
        setSelectedResult(null);
        return;
      }

      const response = await axios.get(
        `${process.env.API_URL}/search?q=${query}`
      );
      setResults(response.data.users);
      setSelectedResult(0);
    };

    fetchResults().catch(console.error);
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedResult((prev) => Math.min(prev + 1, results.length - 1));

      console.log(selectedResult);
      console.log(results[selectedResult]);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();

      console.log(selectedResult);
      console.log(results[selectedResult]);

      setSelectedResult((prev) => Math.max(prev - 1, 0));
    } else if (event.key === "Enter" && selectedResult !== null) {
      event.preventDefault();
      const user = results[selectedResult];
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
              }, 0);
            }}
            onFocus={() => {
              setWidgetIsActive(true);
            }}
            name="search"
            placeholder="search users"
            className="border rounded-md pl-10 pr-2 py-2 text-sm text-gray-600"
            ref={inputRef}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MdSearch className="text-gray-400 font-medium text-2xl text-md" />
          </div>
        </div>

        {!!results.length && widgetIsActive && (
          <ul className="absolute w-52 z-10 top-full left-0 right-0 bg-white border rounded-md overflow-hidden">
            {results.map((user, index) => (
              <li key={user.id}>
                <Link
                  href={`/user/${user.id}`}
                  className={`block px-4 py-2 hover:bg-gray-100 border rounded-md ${
                    selectedResult === index ? "bg-gray-100" : ""
                  }`}
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
