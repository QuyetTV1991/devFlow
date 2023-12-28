import React from "react";
import AnswerCard from "../cards/AnswerCard";
import { getAnswersByUserId } from "@/lib/actions/user.action";

interface AnswerTabProps {
  userId: string;
}

const AnswerTab = async ({ userId }: AnswerTabProps) => {
  const result = await getAnswersByUserId({ userId });
  const allAnswers = result.answers;
  return (
    <div>
      {allAnswers.length > 0 &&
        allAnswers.map((answer: any, index: number) => (
          <AnswerCard
            key={index}
            question={answer.question}
            author={answer.author}
            upvotes={answer.upvotes}
            createdAt={answer.createdAt}
          />
        ))}
    </div>
  );
};

export default AnswerTab;
