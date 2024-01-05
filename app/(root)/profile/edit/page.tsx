import UserForm from "@/components/forms/UserForm";
import { getUserInfo } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const { userId } = auth();

  if (!userId) redirect("/login");

  const userProfile = await getUserInfo({ userId });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>
      <div className="mt-9">
        <UserForm clerkId={userId} userProfile={JSON.stringify(userProfile)} />
      </div>
    </div>
  );
};

export default Page;
