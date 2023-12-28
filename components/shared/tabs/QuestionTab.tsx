import React from "react";
import QuestionCard from "../cards/QuestionCard";
import { getQuestionsByUserId } from "@/lib/actions/user.action";

interface QuestionTab {
  userId: string;
}

const QuestionTab = async ({ userId }: QuestionTabProps) => {
  const result = await getQuestionsByUserId({ userId });
  const allQuestions = result.questions;
  return (
    <div>
      {allQuestions.length > 0 ??
        allQuestions.map((question, index) => (
          <QuestionCard
            key={index}
            _id={question._id}
            title={question.title}
            tags={question.tags}
            author={question.author}
            upvotes={question.upvotes}
            views={question.views}
            answers={question.answers}
            createdAt={question.createdAt}
          />
        ))}
    </div>
  );
};

export default QuestionTab;
