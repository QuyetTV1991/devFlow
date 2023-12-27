import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserInfo } from "@/lib/actions/user.action";
import { getJoinedDate } from "@/lib/utils";
import { URLProps } from "@/types";
import { SignedIn, auth } from "@clerk/nextjs";
import ProfileLink from "@/components/shared/ProfileLink";
import Stats from "@/components/shared/Stats";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async ({ params, searchParams }: URLProps) => {
  const { userId: clerkId } = auth();
  const profileId = params.id;
  const { user, totalQuestions, totalAnswers } = await getUserInfo({
    userId: profileId,
  });

  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={`${user?.picture}`}
            alt="user profile"
            width={140}
            height={140}
            className="rounded-full object-cover"
          />
          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">{user?.name}</h2>
            <p className="paragraph-regular text-dark200_light800">
              @{user?.username}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {user?.portfolioWebsite && (
                <ProfileLink
                  imgUrl="/assets/icons/link.svg"
                  href={user.portfolioWebsite}
                  title="Portfolio"
                />
              )}

              {user?.location && (
                <ProfileLink
                  imgUrl="/assets/icons/location.svg"
                  title={user.location}
                />
              )}

              <ProfileLink
                imgUrl="/assets/icons/calendar.svg"
                title={`Joined ${getJoinedDate(user.joinedAt)}`}
              />

              {user?.bio && (
                <p className="paragraph-regular text-dark400_light700">
                  {user.bio}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === user.clerkId && (
              <Link href="/profile/edit">
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>

      <div className="mt-10">
        <h4>Stats</h4>
        <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
          <Stats
            type="answer/questions"
            totalAnswers={totalAnswers}
            totalQuestions={totalQuestions}
          />
          <Stats
            type="medal"
            medal="Gold"
            count={0}
            iconUrl="/assets/icons/gold-medal.svg"
          />
          <Stats
            type="medal"
            medal="Silver"
            count={0}
            iconUrl="/assets/icons/silver-medal.svg"
          />
          <Stats
            type="medal"
            medal="Bronze"
            count={0}
            iconUrl="/assets/icons/bronze-medal.svg"
          />
        </div>
      </div>

      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Answer
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">POSTS</TabsContent>
          <TabsContent value="answers">ANSWERS</TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Page;
