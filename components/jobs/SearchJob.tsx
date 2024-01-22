"use client";

import React from "react";
import { JobLocationFilters } from "@/contants/filters";
import Image from "next/image";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

const SearchJob = () => {
  return (
    <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
      <div className="background-light800_darkgradient flex min-h-[56px] grow items-center gap-1 rounded-[10px] px-4">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />

        <Input
          type="text"
          placeholder="Job Title, Company, or Keywords"
          value=""
          onChange={() => {}}
          className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
        />
      </div>

      <div className="relative flex items-center justify-between gap-6">
        <Select defaultValue="" onValueChange={() => {}}>
          <SelectTrigger className="body-regular light-border background-light800_dark300 text-dark500_light700 min-h-[56px] border px-5 py-2.5 sm:min-w-[170px]">
            <div className="text-dark400_light700 line-clamp-1 flex flex-1 items-center gap-3 bg-transparent text-left">
              <Image
                src="assets/icons/location.svg"
                alt="location"
                width={24}
                height={24}
                className="cursor-pointer"
              />
              <SelectValue placeholder="Select Location" />
            </div>
          </SelectTrigger>
          <SelectContent className="text-dark500_light700 small-regular border-none bg-light-900 dark:bg-dark-300">
            <SelectGroup>
              {JobLocationFilters.map((filter, index) => (
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

        <Button className="primary-gradient px-4 py-3 !text-light-900">
          Find Job
        </Button>
      </div>
    </div>
  );
};

export default SearchJob;
