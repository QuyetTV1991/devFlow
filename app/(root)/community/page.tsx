import Pagination from "@/components/shared/Pagination";
import UserCard from "@/components/shared/cards/UserCard";
import Filters from "@/components/shared/filters/Filters";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { UserFilters } from "@/contants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";
import React from "react";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const search = searchParams.q;
  const filter = searchParams.filter;
  const page = searchParams.page;

  const results = await getAllUsers({
    searchQuery: search,
    filter,
    page: page ? +page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <article className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search amazing minds here..."
          otherClasses="flex-1"
        />
        <Filters
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </article>

      <section className="mt-12 flex flex-wrap gap-4">
        {results.users.length > 0 ? (
          results.users.map((user, index) => (
            <UserCard key={index} user={user} />
          ))
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No users yet</p>
            <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
              Join to be the first!
            </Link>
          </div>
        )}
      </section>

      <div className="mt-10">
        <Pagination pageNumber={page ? +page : 1} isNext={results.isNext} />
      </div>
    </>
  );
};

export default Page;
