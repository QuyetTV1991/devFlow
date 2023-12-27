import React from "react";
import Image from "next/image";
import { formatNumbers, formatType } from "@/lib/utils";

interface MedalProps {
  medal?: "Gold" | "Silver" | "Bronze";
  count?: number;
  iconUrl?: string;
}

const Medal = ({ iconUrl, medal, count }: MedalProps) => {
  return (
    <>
      <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-start gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
        <Image src={iconUrl} alt="icon medal" width={40} height={50} />

        <div>
          <p className="paragraph-semibold text-dark200_light900">
            {formatNumbers(count)}
          </p>

          <p className="body-medium text-dark400_light700">
            {medal} {formatType(count, "Badge")}
          </p>
        </div>
      </div>
    </>
  );
};

interface StatsProps {
  totalAnswers: number;
  totalQuestions: number;
}

const Stats = ({ totalAnswers, totalQuestions }: StatsProps) => {
  return (
    <>
      <h4 className="h3-semibold text-dark200_light900">Stats</h4>
      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
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
      </div>

      <Medal medal="Gold" count={0} iconUrl="/assets/icons/gold-medal.svg" />
      <Medal
        medal="Silver"
        count={0}
        iconUrl="/assets/icons/silver-medal.svg"
      />
      <Medal
        medal="Bronze"
        count={0}
        iconUrl="/assets/icons/bronze-medal.svg"
      />
    </>
  );
};

export default Stats;
