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
    const { searchQuery, filter, page = 1, pageSize = 10 } = params;

    // Calculate skipAmount
    const skipAmount = (page - 1) * pageSize;

    // Create query
    const query: FilterQuery<typeof Tag> = {};
    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { description: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortOption = {};
    switch (filter) {
      case "popular":
        sortOption = { questions: -1 };
        break;
      case "recent":
        sortOption = { createdOn: -1 };
        break;
      case "name":
        sortOption = { name: 1 };
        break;
      case "old":
        sortOption = { createdOn: 1 };
        break;

      default:
        break;
    }

    // Find all tags
    const tags = await Tag.find(query)
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOption);

    if (!tags) console.log("somethings went wrong when fetch Tag");

    // Calculate isNext
    const totalTags = await Tag.countDocuments(query)
    const isNext = totalTags > tags.length + skipAmount

    return { tags, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    await connectToDataBase();

    // Detructure params
    const { tagId, searchQuery } = params;

    // Create query for filter TagId
    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    // Create query for filter search - search questions in tag
    const query: FilterQuery<typeof Question> = {};
    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { content: { $regex: searchQuery, $options: "i" } },
      ];
    }

    // find the tag based on TagId and search if exist
    const tag = await Tag.findById(tagFilter).populate({
      path: "questions",
      model: Question,
      match: query,
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!tag) throw new Error("No Tag Found");

    // Return questions to display
    const questions = tag.questions;

    return { tagTitle: tag.name, questions };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getPopularTags() {
  try {
    connectToDataBase();

    const popularTags = await Tag.aggregate([
      {
        $project: {
          name: 1,
          numberOfQuestions: { $size: "$questions" },
        },
      },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);

    return popularTags;
  } catch (error) {
    console.log(error);
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
