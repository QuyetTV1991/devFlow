"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";
import Image from "next/image";

interface FilterProps {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
  imgUrl?: string;
}

const Filters = ({
  filters,
  otherClasses,
  containerClasses,
  imgUrl,
}: FilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultFilter = searchParams.get("filter");

  const handleChangeFilter = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "location",
      value,
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className={`relative ${containerClasses}`}>
      <Select
        defaultValue={defaultFilter || undefined}
        onValueChange={handleChangeFilter}
      >
        <SelectTrigger
          className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}
        >
          <div className="line-clamp-1 flex flex-1 items-center gap-2 text-left">
            {imgUrl && (
              <Image
                src={imgUrl}
                alt="icon"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            )}

            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent className="text-dark500_light700 small-regular border-none bg-light-900 dark:bg-dark-300">
          <SelectGroup>
            {filters.map((filter, index) => (
              <SelectItem
                key={index}
                value={filter.value}
                className="cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400"
              >
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filters;
