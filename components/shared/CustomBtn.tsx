import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

interface CustomBtnProps {
  route: string;
  label: string;
  linkClasses?: string;
  btnClasses?: string;
}

const CustomBtn = ({
  route,
  label,
  linkClasses,
  btnClasses,
}: CustomBtnProps) => {
  return (
    <Link href={`/${route}`} className={`${linkClasses} flex max-sm:w-full`}>
      <Button
        className={`${btnClasses} min-h-[46px] px-4 py-3 !text-light-900`}
      >
        {label}
      </Button>
    </Link>
  );
};

export default CustomBtn;
