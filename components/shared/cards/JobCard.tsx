import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderLocationTag from "../RenderLocationTag";

interface JobCardProps {
  employerLogo: string;
  location: {
    country: string;
    state: string;
    city: string;
  };
  employerWebsite: string;
  jobTitle: string;
  jobDescriptions: string;
  jobType: string;
  salary: {
    min: string | number | null;
    max: string | number | null;
    currency: string | null;
    period: string | null;
  };
  jobApplyLink: string;
}

const JobCard = ({
  employerLogo,
  location,
  employerWebsite,
  jobTitle,
  jobDescriptions,
  jobType,
  salary,
  jobApplyLink,
}: JobCardProps) => {
  return (
    <section className="background-light900_dark200 light-border shadow-light100_darknone flex flex-col items-start gap-6 rounded-lg border p-6 sm:flex-row sm:p-8">
      <div className="flex w-full justify-end sm:hidden">
        <RenderLocationTag
          country={location.country}
          state={location.state}
          city={location.city}
        />
      </div>

      <div className="flex items-center gap-6">
        {employerLogo ? (
          <Link
            href={employerWebsite ?? "/"}
            className="background-light800_dark400 relative h-16 w-16 rounded-xl"
          >
            <Image
              src={employerLogo}
              alt="company logo"
              fill={true}
              className="h-full w-full object-contain p-2"
            />
          </Link>
        ) : (
          <Image
            src="/assets/images/site-logo.svg"
            alt="default site logo"
            width={64}
            height={64}
            className="rounded-[10px]"
          />
        )}
      </div>

      <div className="w-full">
        <div className="flex-between flex-wrap gap-2">
          <p className="base-semibold text-dark200_light900">{jobTitle}</p>
          <div className="hidden sm:flex">
            <RenderLocationTag
              country={location.country}
              state={location.state}
              city={location.city}
            />
          </div>
        </div>
        <p className="body-regular text-dark500_light700 mt-2 line-clamp-2">
          {jobDescriptions}
        </p>
        <div className="flex-between mt-8 flex-wrap gap-6">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/icons/clock-2.svg"
                alt="clock"
                width={20}
                height={20}
              />
              <p className="body-medium capitalize text-light-500">{jobType}</p>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src="/assets/icons/currency-dollar-circle.svg"
                alt="clock"
                width={20}
                height={20}
              />
              <p className="body-medium capitalize text-light-500">
                {salary.min
                  ? `Minimum ${salary.min} ${
                      salary.currency
                    }/${salary.period?.toLowerCase()}`
                  : salary.max
                  ? `Maximum ${salary.max} ${
                      salary.currency
                    } per ${salary.period?.toLowerCase()}`
                  : "Not disclosed"}
              </p>
            </div>
          </div>
          <Link href={jobApplyLink} className="flex items-center gap-2">
            <p className="body-semibold primary-text-gradient">View Job</p>
            <Image
              src="/assets/icons/arrow-up-right.svg"
              alt="arrow up right"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JobCard;
