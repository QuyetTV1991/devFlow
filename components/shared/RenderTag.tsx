import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";

interface RenderTagProps {
  tag: string;
  _id: number | string;
  amount?: number;
  showAmount?: boolean;
}

const RenderTag = ({ tag, _id, amount, showAmount }: RenderTagProps) => {
  return (
    <Link href={`tags/${_id}`} className="flex justify-between gap-2">
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        {tag}
      </Badge>
      {showAmount && (
        <p className="small-medium text-dark500_light700">{amount}</p>
      )}
    </Link>
  );
};

export default RenderTag;
