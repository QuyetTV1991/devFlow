import NoResult from "@/components/shared/NoResult";
// import Pagination from "@/components/shared/Pagination";
import { SearchParamsProps } from "@/types";
import React from "react";
import { Metadata } from "next";
import { JobLocationFilters } from "@/contants/filters";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import JobCard from "@/components/shared/cards/JobCard";
import JobFilters from "@/components/shared/filters/JobFilters";
import { fetchJobs } from "@/lib/actions/general.action";

export const metadata: Metadata = {
  title: "Jobs",
};

const Page = async ({ searchParams }: SearchParamsProps) => {
  const page = searchParams.page;
  const search = searchParams.q;
  const location = searchParams.location;
  const locationCode = JobLocationFilters.find(
    (item) => item.value === location
  );

  const { result } = await fetchJobs({
    query: search,
    location: locationCode?.code,
    page: page ? +page : 1,
  });

  const allJobs = result.data;

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Jobs</h1>

      <article className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/jobs"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Job Title, Company, or Keywords"
          otherClasses="flex-1"
        />
        <div className="flex items-center justify-between gap-6">
          <JobFilters
            filters={JobLocationFilters}
            otherClasses="min-h-[56px] sm:min-w-[170px]"
            containerClasses="w-full"
            imgUrl="assets/icons/location.svg"
          />
          <Button className="primary-gradient px-4 py-3 !text-light-900">
            Find Job
          </Button>
        </div>
      </article>

      <div className="mt-10 flex w-full flex-col gap-6">
        {allJobs ? (
          <section className="light-border mb-9 mt-11 flex flex-col gap-9 border-b pb-9">
            {allJobs.map((job: any, index: number) => (
              <JobCard
                key={index}
                employerLogo={job.employer_logo}
                location={{
                  country: job.job_country,
                  state: job.job_state,
                  city: job.job_city,
                }}
                employerWebsite={job.employer_website}
                jobTitle={job.job_title}
                jobDescriptions={job.job_description}
                jobType={job.job_employment_type}
                salary={{
                  min: job.job_min_salary,
                  max: job.job_max_salary,
                  currency: job.job_salary_currency,
                  period: job.job_salary_period,
                }}
                jobApplyLink={job.job_apply_link}
              />
            ))}
          </section>
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
        {/* <Pagination pageNumber={page ? +page : 1} isNext={result.isNext} /> */}
      </div>
    </>
  );
};

export default Page;
