import Image from "next/image";
import React from "react";
import CustomBtn from "./CustomBtn";

interface NoResultProps {
  title: string;
  description: string;
  link?: string | null;
  linkTitle?: string | null;
}

const NoResult = ({ title, description, link, linkTitle }: NoResultProps) => {
  return (
    <div className="flex-center mt-10 w-full flex-col">
      <Image
        src="/assets/images/light-illustration.png"
        alt="light illustration"
        width={270}
        height={200}
        className="block object-contain dark:hidden"
      />

      <Image
        src="/assets/images/dark-illustration.png"
        alt="light illustration"
        width={270}
        height={200}
        className="hidden object-contain dark:flex"
      />

      <h2 className="h2-bold text-dark200_light900 mt-8">{title}</h2>
      <p className="body-regular text-dark500_light700 my-3.5 max-w-md text-center">
        {description}
      </p>
      {link && linkTitle && (
        <CustomBtn
          route={link}
          label={linkTitle}
          linkClasses="justify-center"
          btnClasses="paragraph-medium mt-5 rounded-lg bg-primary-500 hover:bg-slate-500 dark:bg-primary-500 dark:text-light-900"
        />
      )}
    </div>
  );
};

export default NoResult;
