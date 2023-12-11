import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CreatorProps {
  creator: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  createdAt: string;
}

const Creator = ({ creator, createdAt }: CreatorProps) => {
  return (
    <Link href={`/profile/${creator._id}`} className="flex-center gap-1">
      <Image
        src={creator.picture}
        alt={creator.name}
        width={16}
        height={16}
        className="rounded-full object-contain"
      />
      <p className="body-medium text-dark400_light700 flex items-center gap-1">
        {creator.name}
        <span className="small-regular line-clamp-1 max-sm:hidden">
          &bull; asked {createdAt}
        </span>
      </p>
    </Link>
  );
};

export default Creator;
