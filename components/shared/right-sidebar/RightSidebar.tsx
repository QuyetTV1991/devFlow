import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "../RenderTag";

type Question = {
  _id: number;
  question: string;
};

const questionsList: Question[] = [
  {
    _id: 1,
    question:
      "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
  },
  { _id: 2, question: "Is it only me or the font is bolder than necessary?" },
  { _id: 3, question: "Can I get the course for free?" },
  { _id: 4, question: "Redux Toolkit Not Updating State as Expected" },
  { _id: 5, question: "Async/Await Function Not Handling Errors Properly" },
  { _id: 6, question: "How to get a list of Appearances properties in Clerk?" },
];

type Tag = {
  _id: number;
  tag: string;
  amount: number;
};

const tags: Tag[] = [
  {
    _id: 1,
    tag: "nextjs",
    amount: 23,
  },
  {
    _id: 2,
    tag: "test",
    amount: 18,
  },
  {
    _id: 3,
    tag: "react",
    amount: 17,
  },
  {
    _id: 4,
    tag: "css",
    amount: 12,
  },
  { _id: 5, tag: "next js", amount: 9 },
];

const RightSidebar = () => {
  return (
    <section className="custom-scrollbar background-light900_dark300 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {questionsList.map((question, index) => (
            <Link
              href={`/question/${question._id}`}
              key={index}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.question}
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
          {tags.map((tag, index) => (
            <RenderTag
              key={index}
              tag={tag.tag}
              _id={tag._id}
              amount={tag.amount}
              showAmount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
