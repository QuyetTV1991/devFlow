"use client";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface SearchProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearchbar = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: SearchProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const query = searchParams.get("q");

  const [search, setSearch] = useState(query || "");
  const [debounced, setDebounced] = useState(search);

  // Debounced function, delay 500 ms
  useEffect(() => {
    const timer = setTimeout(() => setSearch(debounced), 500);
    return () => clearTimeout(timer);
  }, [debounced]);

  // updated search term
  useEffect(() => {
    if (search !== "") {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "q",
        value: search,
      });

      router.push(newUrl, { scroll: false });
    } else {
      if (pathname === route) {
        const newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["q"],
        });

        router.push(newUrl, { scroll: false });
      }
    }
  }, [search, route, pathname, router, searchParams, query]);

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-1 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}

      <Input
        type="text"
        placeholder={placeholder}
        value={debounced}
        onChange={(e) => setDebounced(e.target.value)}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
      />

      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearchbar;
