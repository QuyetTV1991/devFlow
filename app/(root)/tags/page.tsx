import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import TagCard from "@/components/shared/cards/TagCard";
import Filters from "@/components/shared/filters/Filters";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { TagFilters } from "@/contants/filters";
import { getAllTags } from "@/lib/actions/tag.action";
import { SearchParamsProps } from "@/types";
import React from "react";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const search = searchParams.q;
  const filter = searchParams.filter;
  const page = searchParams.page;

  const results = await getAllTags({
    searchQuery: search,
    filter,
    page: page ? +page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Tags</h1>
      <article className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search by tag name..."
          otherClasses="flex-1"
        />
        <Filters
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </article>

      <section className="mt-12 flex flex-wrap gap-4">
        {results.tags.length > 0 ? (
          results.tags.map((tag, index) => (
            <TagCard
              key={index}
              name={tag.name}
              questions={tag.questions.length}
              id={tag._id}
            />
          ))
        ) : (
          <NoResult
            title={"No Tags Found"}
            description={"It looks like there are no tags found"}
            link={"/ask-question"}
            linkTitle={"Ask a question"}
          />
        )}
      </section>

      <div className="mt-10">
        <Pagination pageNumber={page ? +page : 1} isNext={results.isNext} />
      </div>
    </>
  );
};

export default Page;
