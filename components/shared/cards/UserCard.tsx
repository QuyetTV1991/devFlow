import { IUser } from "@/database/user.model";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "../RenderTag";

interface UserCardProps {
  user: IUser;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link
      href={`profile/${user.clerkId}`}
      className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]"
    >
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Image
          src={user.picture}
          alt={user.name}
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">
            @{user.username}
          </p>
        </div>
        <div className="mt-5">
          <div className="flex items-center gap-2">
            <RenderTag tag="java" _id="1" />
            <RenderTag tag="nextjs" _id="2" />
            <RenderTag tag="html" _id="3" />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
