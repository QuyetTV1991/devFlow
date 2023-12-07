import { Question } from "@/contants/data";
import Link from "next/link";
import React from "react";
import RenderTag from "../RenderTag";
import Creator from "../creator/Creator";
import RenderStat from "../RenderStat";
import { getTimeStamp } from "@/lib/utils";

interface QuestionProps {
  question: Question;
}

const QuestionCard = ({ question }: QuestionProps) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(question.createdAt)}
          </span>

          <Link href={`question/${question._id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {question.title}
            </h3>
          </Link>
        </div>

        {/* if signed-in, then add eidt delete action */}
      </div>

      <div className="mt-3.5 flex flex-wrap items-center justify-start gap-3">
        {question.tags.map((tag, index) => (
          <RenderTag key={index} tag={tag.name} _id={tag._id} />
        ))}
      </div>

      <div className="flex-between mt-6 flex-wrap gap-3">
        <div>
          <Creator
            creator={question.creator}
            createdAt={getTimeStamp(question.createdAt)}
          />
        </div>
        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <RenderStat
            imgUrl="/assets/icons/like.svg"
            count={question.likes}
            type="Vote"
          />
          <RenderStat
            imgUrl="/assets/icons/message.svg"
            count={question.answers}
            type="Answer"
          />
          <RenderStat
            imgUrl="/assets/icons/eye.svg"
            count={question.views}
            type="View"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
