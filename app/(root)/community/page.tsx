import Pagination from "@/components/shared/Pagination";
import UserCard from "@/components/shared/cards/UserCard";
import Filters from "@/components/shared/filters/Filters";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { UserFilters } from "@/contants/filters";
import { getAllUses } from "@/lib/actions/user.action";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const allUsers = await getAllUses({});

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
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
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {allUsers ? (
          allUsers.map((user, index) => <UserCard key={index} user={user} />)
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
        <Pagination pageNumber={1} isNext={true} />
      </div>
    </>
  );
};

export default Page;
