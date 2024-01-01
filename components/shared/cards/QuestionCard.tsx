import Link from "next/link";
import React from "react";
import RenderTag from "../RenderTag";
import Creator from "../creator/Creator";
import RenderStat from "../RenderStat";
import { getTimeStamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../EditDeleteAction";

interface QuestionProps {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  upvotes: string[];
  views: number;
  answers: Array<object>;
  createdAt: Date;
  clerkId?: string | null;
}

const QuestionCard = ({
  clerkId,
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: QuestionProps) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div className="max-w-xl">
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>

          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>

        {/* if signed-in, then add eidt delete action */}
        <SignedIn>
          {clerkId === author.clerkId && (
            <EditDeleteAction type="Question" _id={`${_id}`} />
          )}
        </SignedIn>
      </div>

      <div className="mt-3.5 flex flex-wrap items-center justify-start gap-3">
        {tags.map((tag, index) => (
          <RenderTag key={index} tag={tag.name} _id={String(tag._id)} />
        ))}
      </div>

      <div className="flex-between mt-6 flex-wrap gap-3">
        <div>
          <Creator creator={author} createdAt={getTimeStamp(createdAt)} />
        </div>
        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <RenderStat
            imgUrl="/assets/icons/like.svg"
            count={upvotes.length}
            type="Vote"
          />
          <RenderStat
            imgUrl="/assets/icons/message.svg"
            count={answers.length}
            type="Answer"
          />
          <RenderStat
            imgUrl="/assets/icons/eye.svg"
            count={views}
            type="View"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
