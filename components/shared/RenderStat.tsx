import { formatNumbers, formatType } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface RenderStatProps {
  imgUrl: string;
  count: number | string;
  type: string;
}

const RenderStat = ({ imgUrl, count, type }: RenderStatProps) => {
  return (
    <div className="flex-center flex-wrap gap-1">
      <Image
        src={imgUrl}
        alt={type}
        width={16}
        height={16}
        className="object-contain"
      />
      {type === "time" ? (
        <p className="small-medium text-dark400_light800 flex items-center gap-1">
          {count}
        </p>
      ) : (
        <p className="small-medium text-dark400_light800 flex items-center gap-1">
          {formatNumbers(Number(count))}
          <span className="small-regular line-clamp-1">
            {` ${formatType(Number(count), type)}`}
          </span>
        </p>
      )}
    </div>
  );
};

export default RenderStat;
