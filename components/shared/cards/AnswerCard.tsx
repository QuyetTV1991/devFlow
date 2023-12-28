import Link from "next/link";
import React from "react";
import Creator from "../creator/Creator";
import RenderStat from "../RenderStat";
import { getTimeStamp } from "@/lib/utils";

interface AnswerCardProps {
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
  createdAt: Date;
}

const AnswerCard = ({
  question,
  author,
  upvotes,
  createdAt,
}: AnswerCardProps) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>

          <Link href={`/question/${question._id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {question.title}
            </h3>
          </Link>
        </div>

        {/* if signed-in, then add eidt delete action */}
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
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
