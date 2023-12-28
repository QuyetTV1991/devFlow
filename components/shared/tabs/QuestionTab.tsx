import React from "react";
import QuestionCard from "../cards/QuestionCard";
import { URLProps } from "@/types";
import { getQuestionsByUserId } from "@/lib/actions/user.action";

const QuestionTab = async ({ params }: URLProps) => {
  const result = await getQuestionsByUserId({ userId: params.id });
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
