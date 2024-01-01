import Link from "next/link";
import React from "react";
import Creator from "../creator/Creator";
import RenderStat from "../RenderStat";
import { getTimeStamp } from "@/lib/utils";
import EditDeleteAction from "../EditDeleteAction";
import { SignedIn } from "@clerk/nextjs";

interface AnswerCardProps {
  _id: string;
  question: {
    _id: string;
    title: string;
  };
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  upvotes: string[];
  clerkId?: string | null;
  createdAt: Date;
}

const AnswerCard = ({
  _id,
  question,
  author,
  upvotes,
  createdAt,
  clerkId,
}: AnswerCardProps) => {
  return (
    <Link
      href={`/question/${question._id}/#${_id}`}
      className="card-wrapper rounded-[10px] px-11 py-9"
    >
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div className="max-w-xl">
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {question.title}
          </h3>
        </div>

        {/* if signed-in, then add eidt delete action */}
        <SignedIn>
          {clerkId === author.clerkId && (
            <EditDeleteAction type="Answer" _id={`${_id}`} />
          )}
        </SignedIn>
      </div>

      <div className="flex-between mt-6 flex-wrap gap-3">
        <div>
          <Creator creator={author} createdAt={getTimeStamp(createdAt)} />
        </div>
        <div className="flex-center gap-3">
          <RenderStat
            imgUrl="/assets/icons/like.svg"
            count={upvotes.length}
            type="Vote"
          />
        </div>
      </div>
    </Link>
  );
};

export default AnswerCard;
