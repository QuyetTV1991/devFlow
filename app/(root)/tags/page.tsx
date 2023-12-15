import Pagination from "@/components/shared/Pagination";
import TagCard from "@/components/shared/cards/TagCard";
import Filters from "@/components/shared/filters/Filters";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { TagFilters } from "@/contants/filters";
import { getAllTags } from "@/lib/actions/tag.action";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const results = await getAllTags({});
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <article className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/community"
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
          results.tags.map((tag, index) => <TagCard key={index} tag={tag} />)
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No tags yet</p>
            <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
              Let create one first!
            </Link>
          </div>
        )}
      </section>

      <div className="mt-10">
        <Pagination pageNumber={1} isNext={true} />
      </div>
    </>
  );
};

export default Page;
