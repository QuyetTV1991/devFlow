import Link from "next/link";
import Image from "next/image";
import React from "react";
import { getUserByMongoId } from "@/lib/actions/user.action";
import { getTimeStamp } from "@/lib/utils";
import ParseHTML from "../ParseHTML";

interface AnswerCardProps {
  content: string;
  authorId: string;
  createdAt: Date;
}

const AnswerCard = async ({
  content,
  authorId,
  createdAt,
}: AnswerCardProps) => {
  const userAuthor = await getUserByMongoId({ userId: authorId });
  console.log({ userAuthor });

  return (
    <article className="light-border border-b py-10">
      <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <Link
          href={`profile/dfdfds}`}
          className="flex flex-1 items-start gap-1 sm:items-center"
        >
          <Image
            src={userAuthor.picture}
            alt="user profile"
            width={18}
            height={18}
            className="rounded-full object-cover max-sm:mt-0.5"
          />
          <div className="flex flex-col sm:flex-row sm:items-center">
            <p className="body-semibold text-dark300_light700">
              {userAuthor.name}
            </p>
            <p className="small-regular text-light400_light500 mt-0.5 line-clamp-1">
              {" "}
              <span className="max-sm:hidden"> &bull; </span>
              {` answered ${getTimeStamp(createdAt)}`}
            </p>
          </div>
        </Link>
        <div className="flex justify-end">Voting</div>
      </div>

      <ParseHTML data={content} />
    </article>
  );
};

export default AnswerCard;
