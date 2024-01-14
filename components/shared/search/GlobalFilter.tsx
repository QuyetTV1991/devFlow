"use client";

import { Button } from "@/components/ui/button";
import { GlobalSearchFilters } from "@/contants/filters";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const GlobalFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const type = searchParams.get("type");

  const [active, setActive] = useState(type || "");

  const handleGlobalFilterClick = (type: string) => {
    // handle toggle fillter
    if (active === type) {
      setActive("");

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(type);

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: type,
      });
      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="flex items-center gap-5 px-5">
      <p className="text-dark400_light900 body-medium">Type:</p>
      <div className="flex gap-3">
        {GlobalSearchFilters.map((filter, index) => (
          <Button
            key={index}
            className={`light-boder-2 small-medium rounded-2xl px-5 py-2 capitalize ${
              active === filter.value
                ? "bg-primary-500 text-light-900 hover:text-dark-500"
                : "bg-light-700 text-dark-400 hover:text-primary-500 dark:bg-dark-500 dark:text-light-800 dark:hover:bg-primary-500/70 dark:hover:text-dark-500"
            }`}
            onClick={() => handleGlobalFilterClick(filter.value)}
          >
            {filter.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default GlobalFilter;
