import React from "react";
import Image from "next/image";

interface StatsProps {
  totalAnswers?: number;
  totalQuestions?: number;
  type: string;
  medal?: "Gold" | "Silver" | "Bronze";
  count?: number;
  iconUrl?: string;
}

const Stats = ({
  totalAnswers,
  totalQuestions,
  type,
  medal,
  count,
  iconUrl,
}: StatsProps) => {
  return (
    <>
      {type === "medal" ? (
        <>
          <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
            <Image src={iconUrl} alt="icon medal" width={40} height={50} />
            <div>
              <p className="paragraph-semibold text-dark200_light900">
                {count}
              </p>
              <p className="body-medium text-dark400_light700">
                {medal} Badges
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
            <div>
              <p className="paragraph-semibold text-dark200_light900">
                {totalQuestions}
              </p>
              <p className="body-medium text-dark400_light700">Questions</p>
            </div>
            <div>
              <p className="paragraph-semibold text-dark200_light900">
                {totalAnswers}
              </p>
              <p className="body-medium text-dark400_light700">Answers</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Stats;
