import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import QuestionCard from "@/components/shared/cards/QuestionCard";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { Metadata } from "next";
import SearchJob from "@/components/jobs/SearchJob";

export const metadata: Metadata = {
  title: "Jobs",
};

const Page = async ({ searchParams }: SearchParamsProps) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const page = searchParams.page;
  const result = {
    questions: [],
    isNext: false,
  };

  //   const search = searchParams.q;
  //   const filter = searchParams.filter;

  //   const result = await getSavedQuestion({
  //     clerkId: userId,
  //     searchQuery: search,
  //     filter,
  //     page: page ? +page : 1,
  //   });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Jobs</h1>

      <SearchJob />

      <div className="mt-10 flex w-full flex-col gap-6">
        {result?.questions && result?.questions.length > 0 ? (
          result.questions.map((question: any, index: number) => (
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
          ))
        ) : (
          <div className="flex-center text-dark400_light500 mt-10 w-full">
            <NoResult
              title="There&#39;s no job to show"
              description="Currently, there is no matches job to show, please try another keywords or change the location"
            />
          </div>
        )}
      </div>

      <div className="mt-10">
        <Pagination pageNumber={page ? +page : 1} isNext={result.isNext} />
      </div>
    </>
  );
};

export default Page;
