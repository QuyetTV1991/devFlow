import Link from "next/link";
// import { Badge } from "@/components/ui/badge";

interface TagCardProps {
  tag: {
    _id: string;
    name: string;
  };
}

const UserCard = ({ tag }: TagCardProps) => {
  return (
    <Link
      href={`tags/${tag._id}`}
      className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]"
    >
      <div className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <div className="mt-4 text-center"></div>
      </div>
    </Link>
  );
};

export default UserCard;
