"use server";

import User from "@/database/user.model";
import { connectToDataBase } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import Tag from "@/database/tag.model";

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
    const tags = await Tag.find({}).sort({ createdAt: -1 });

    if (!tags) console.log("somethings went wrong");

    return { tags };
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
