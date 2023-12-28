import React from "react";
import QuestionCard from "../cards/QuestionCard";
import { getQuestionsByUserId } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";

interface QuestionTabProps extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const QuestionTab = async ({
  userId,
  searchParams,
  clerkId,
}: QuestionTabProps) => {
  const result = await getQuestionsByUserId({ userId });
  const allQuestions = result.questions;
  return (
    <>
      {allQuestions.length > 0 &&
        allQuestions.map((question, index) => (
          <QuestionCard
            key={index}
            _id={question._id}
            clerkId={clerkId}
            title={question.title}
            tags={question.tags}
            author={question.author}
            upvotes={question.upvotes}
            views={question.views}
            answers={question.answers}
            createdAt={question.createdAt}
          />
        ))}
    </>
  );
};

export default QuestionTab;
