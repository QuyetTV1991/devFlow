"use client";

import Image from "next/image";
import Link from "next/link";
import { ReloadIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import GlobalFilter from "./GlobalFilter";
import { useSearchParams } from "next/navigation";
import { globalSearch } from "@/lib/actions/general.action";

interface ResultProps {
  href: string;
  title: string;
  type: string;
}

const Result = ({ href, title, type }: ResultProps) => {
  return (
    <Link
      href={href}
      className="flex w-full cursor-pointer items-start gap-3 px-5 py-2.5 hover:bg-light-700/50 dark:hover:bg-dark-500/50"
    >
      <Image
        src="/assets/icons/tag.svg"
        alt="tags"
        width={18}
        height={18}
        className="invert-colors mt-1 object-contain"
      />

      <div className="flex flex-col">
        <p className="body-medium text-dark200_light800 line-clamp-1">
          {title}
        </p>
        <p className="small-medium mt-1 font-bold capitalize text-light400_light500">
          {type}
        </p>
      </div>
    </Link>
  );
};

const GlobalResult = () => {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("initial");
  const [result, setResult] = useState([]);

  const global = searchParams.get("global");
  const type = searchParams.get("type");

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setResult([]);
        setStatus("loading");
        // fetching everything at everywhere
        const res = await globalSearch({
          query: global,
          type,
        });

        setResult(JSON.parse(res));
        setStatus("success");
      } catch (error) {
        setStatus("error");
        console.error(error);
        throw error;
      }
    };
    if (global) {
      fetchResult();
    }
  }, [global, type]);

  const renderLink = (type: string, id: string) => {
    switch (type) {
      case "question":
        return `/question/${id}`;
      case "answer":
        return `/question/${id}`;
      case "user":
        return `/profile/${id}`;
      case "tag":
        return `/tags/${id}`;
      default:
        return "/";
    }
  };

  const isLoading = status === "loading";

  return (
    <div className="absolute top-full z-10 mt-3 w-full rounded-xl bg-light-800 py-5 shadow-sm dark:bg-dark-400">
      <GlobalFilter />

      <div className="my-5 h-[1px] bg-light-700/50 dark:bg-dark-500/50"></div>

      <div className="space-y-5">
        <p className="text-dark400_light900 paragraph-semibold px-5">
          Top Match
        </p>
        {isLoading ? (
          <div className="flex-center flex-col px-5">
            <ReloadIcon className="my-2 h-10 w-10 text-primary-500 animate-spin" />
            <p className="text-dark200_light800 body-regular">
              Browsing the entire database
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {result.length > 0 ? (
              result.map((item: any, index: number) => (
                <Result
                  key={index}
                  href={renderLink(item.type, item.id)}
                  title={item.title}
                  type={item.type}
                />
              ))
            ) : (
              <div className="flex-center flex-col px-5">
                <p className="text-dark200_light800 body-regular px-5 py-2.5">
                  Oops, no results found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalResult;
