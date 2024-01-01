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
  const result = await getAnswersByUserId({ userId });
  const allAnswers = result.answers;
  return (
    <>
      {allAnswers.length > 0 &&
        allAnswers.map((answer: any, index: number) => (
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
        {allAnswers.length > 10 && <Pagination pageNumber={1} isNext={true} />}
      </div>
    </>
  );
};

export default AnswerTab;
