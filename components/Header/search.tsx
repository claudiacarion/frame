"use client";

import { searchPosts, SearchResultType } from "@/lib/supabase/queries";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState, SetStateAction, useRef, useEffect } from "react";

const Search = () => {
  const [input, setInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResultType | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchResults(null);
        setHasSearched(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await searchPosts(input);
    if (error) throw error;
    setSearchResults(data);
    setInput("");
    setHasSearched(true);
  };

  const handleSearchResults = () => {
    setSearchResults(null);
    setHasSearched(false);
  };

  return (
    <div className="relative bg-white text-black py-2 px-4 rounded-4xl lg:w-1/3 mx-auto text-sm" ref={searchRef}>
      <form onSubmit={handleSubmit} className='flex'>
        <input onChange={handleChange} placeholder="search" value={input} className="flex-1 border-none focus:outline-none" />
        <button>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-lilac transition-colors duration-300 hover:text-apricot cursor-pointer"
          />
        </button>
      </form>
      {hasSearched && (
        <div className="absolute left-0 top-full w-full">
          {searchResults && searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <Link
                key={index}
                href={`/${result.slug}`}
                className="block py-2 px-4 bg-apricot rounded-4xl"
                onClick={handleSearchResults}>
                {result.title}
              </Link>
            ))
          ) : (
            <div className="py-2 px-4 bg-apricot rounded-4xl">no results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
