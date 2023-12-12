"use server";

import User, { IUser } from "@/database/user.model";
import { connectToDataBase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetUserByIdParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

export async function getUserById({ userId }: GetUserByIdParams) {
  try {
    connectToDataBase();

    // Find the user based on ClerkId
    const user = await User.findOne<IUser>({ clerkId: userId });

    if (!user) console.log("cant found");

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDataBase();

    // Create new User
    const newUser = await User.create(userData);

    if (!newUser) throw new Error('not found');

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(userUpdateData: UpdateUserParams) {
  try {
    connectToDataBase();

    // Destructed data from params
    const { clerkId, updateData, path } = userUpdateData;

    // Find and update user data based on ClerkId, return data after update
    const updatedUser = await User.findByIdAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    
    if(!updatedUser) {
      throw new Error('not found user to update')
    }

    // Revalidate Path
    revalidatePath(path);

    return updatedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(userId: DeleteUserParams) {
  try {
    connectToDataBase();

    const { clerkId } = userId;

    // Find and delete the user based on ClerkId
    const user = await User.findOne({ clerkId });

    // Throw an error if not found
    if (!user) throw new Error("User not found to delte");

    // Get user's question ids
    // const userQuestionIds = await Question.find({ author: user._id }).distinct(
    //   "_id"
    // );

    // Delete user-related data (e.g., questions, answers, comments, etc.)
    await Question.deleteMany({ author: user._id });

    // TODO: Additional steps to delete user's answers, comments, etc.

    // Finally, delete the user
    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
