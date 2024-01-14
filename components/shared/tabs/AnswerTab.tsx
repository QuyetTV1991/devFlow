import React from "react";
import AnswerCard from "../cards/AnswerCard";
import { getAnswersByUserId } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import Pagination from "../Pagination";

interface AnswerTabProps extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswerTab = async ({ userId, searchParams, clerkId }: AnswerTabProps) => {
  const page = searchParams.page;

  const result = await getAnswersByUserId({
    userId,
    page: page ? +page : 1,
    pageSize: 2,
  });

  return (
    <>
      {result.answers.length > 0 &&
        result.answers.map((answer: any, index: number) => (
          <AnswerCard
            key={index}
            _id={answer._id}
            question={answer.question}
            author={answer.author}
            upvotes={answer.upvotes}
            createdAt={answer.createdAt}
            clerkId={clerkId}
          />
        ))}
      <div className="mt-10">
        <Pagination pageNumber={page ? +page : 1} isNext={result.isNext} />
      </div>
    </>
  );
};

export default AnswerTab;
