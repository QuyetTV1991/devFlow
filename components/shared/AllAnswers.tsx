import React from "react";
import Filters from "./filters/Filters";
import { AnswerFilters } from "@/contants/filters";
import { GetAllAnswer } from "@/lib/actions/answer.action";
import Link from "next/link";
import Image from "next/image";
import { formatNumbers, getTimeStamp, formatType } from "@/lib/utils";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";

interface AllAnswersProps {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: AllAnswersProps) => {
  const result = await GetAllAnswer({ questionId, sortBy: filter });

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">
          {formatNumbers(totalAnswers)} {formatType(totalAnswers, "Answer")}
        </h3>
        <Filters filters={AnswerFilters} />
      </div>

      <div>
        {result.answers.map((answer, index) => (
          <article key={index} className="light-border border-b py-10">
            <div className="flex items-center justify-between">
              {/* SPAN ID */}
              <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <Link
                  href={`/profile/${answer.author.clerkId}`}
                  className="flex flex-1 items-start gap-1 sm:items-center"
                >
                  <Image
                    src={answer.author.picture}
                    alt="profile"
                    width={18}
                    height={18}
                    className="rounded-full object-cover max-sm:mt-0.5"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark300_light700">
                      {answer.author.name}
                    </p>
                    <p className="small-regular text-light400_light500 mt-0.5 line-clamp-1">
                      <span className="ml-1 max-sm:hidden"> &bull;</span>{" "}
                      answered {getTimeStamp(answer.createdAt)}
                    </p>
                  </div>
                </Link>
              </div>
              <div className="flex justify-end">
                <Votes
                  type="Answer"
                  itemId={`${answer._id}`}
                  userId={JSON.stringify(userId)}
                  upvotes={answer.upvotes.length}
                  hasupVoted={answer.upvotes.includes(userId)}
                  downvotes={answer.downvotes.length}
                  hasdownVoted={answer.downvotes.includes(userId)}
                />
              </div>
            </div>
            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>
    </div>
  );
};

export default AllAnswers;
