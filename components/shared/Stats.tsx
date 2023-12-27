import React from "react";
import Image from "next/image";
import { formatNumbers, formatType } from "@/lib/utils";

interface StatsProps {
  totalAnswers?: number;
  totalQuestions?: number;
  medal?: "Gold" | "Silver" | "Bronze";
  count?: number;
  iconUrl?: string;
}

const Stats = ({
  totalAnswers,
  totalQuestions,
  medal,
  count,
  iconUrl,
}: StatsProps) => {
  return (
    <>
      {iconUrl ? (
        <>
          <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-start gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
            <Image src={iconUrl} alt="icon medal" width={40} height={50} />
            <div>
              <p className="paragraph-semibold text-dark200_light900">
                {formatNumbers(count ?? 0)}
              </p>
              <p className="body-medium text-dark400_light700">
                {medal} {formatType(count ?? 0, "Badge")}
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
            <div>
              <p className="paragraph-semibold text-dark200_light900">
                {formatNumbers(totalQuestions)}
              </p>
              <p className="body-medium text-dark400_light700">
                {formatType(totalQuestions, "Quesiton")}
              </p>
            </div>
            <div>
              <p className="paragraph-semibold text-dark200_light900">
                {formatNumbers(totalAnswers)}
              </p>
              <p className="body-medium text-dark400_light700">
                {formatType(totalAnswers, "Answer")}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Stats;
