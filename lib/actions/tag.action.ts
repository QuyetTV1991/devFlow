/* eslint-disable no-unused-vars */
"use server";

import User from "@/database/user.model";
import { connectToDataBase } from "../mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import Tag, { ITag } from "@/database/tag.model";
import Question from "@/database/question.model";
import { FilterQuery } from "mongoose";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDataBase();

    // destructure params
    const { userId } = params;

    // Find the user by Id
    const user = await User.findById(userId);

    // if not found
    if (!user) throw new Error("User not found");

    // Find interactions for the user and group by tags...
    // Interaction...

    return [
      { _id: 123, name: "tag1" },
      { _id: 234, name: "tag2" },
      { _id: 345, name: "tag3" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDataBase();

    // Detructs the params
    // const { page = 1, pageSize = 20, filter, searchQuery } = params;

    // Find all users
    const tags = await Tag.find({}).sort({ createdOn: -1 });

    if (!tags) console.log("somethings went wrong");

    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    await connectToDataBase();

    // Detructure params
    const { tagId, page = 1, pageSize = 10, searchQuery } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findById(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!tag) throw new Error("No Tag Found");

    const questions = tag.questions;

    return { tagTitle: tag.name, questions };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// export async function name(params:any) {
//     try {
//         connectToDataBase()
//     } catch (error) {
//         console.log(error)
//         throw error
//     }
// }
