"use client";

import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface EditDeleteActionProps {
  _id: string;
  type: string;
}

const EditDeleteAction = ({ _id, type }: EditDeleteActionProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleEdit = () => {
    router.push(`/question/edit/${_id}`);
  };

  const handleDelete = async () => {
    if (type === "Answer") {
      await deleteAnswer({ answerId: _id, path: pathname });
    } else {
      await deleteQuestion({ questionId: _id, path: pathname });
    }
  };
  return (
    <div className="flex items-center justify-end gap-5">
      {type === "Question" && (
        <Image
          src="/assets/icons/edit.svg"
          alt="Edit"
          width={14}
          height={14}
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        />
      )}

      <Image
        src="/assets/icons/trash.svg"
        alt="Delete"
        width={14}
        height={14}
        className="cursor-pointer object-contain"
        onClick={handleDelete}
      />
    </div>
  );
};

export default EditDeleteAction;
