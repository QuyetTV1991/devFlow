import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "../RenderTag";
import { getTopQuestions } from "@/lib/actions/question.action";
import { getPopularTags } from "@/lib/actions/tag.action";

const RightSidebar = async () => {
  const results = await getTopQuestions();
  const popularTags = await getPopularTags();

  return (
    <section className="custom-scrollbar background-light900_dark300 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {results.questions.map((question, index) => (
            <Link
              href={`/question/${question._id}`}
              key={index}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="Right Arrow"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag, index) => (
            <RenderTag
              key={index}
              tag={tag.name}
              _id={tag._id}
              amount={tag.numberOfQuestions}
              showAmount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
