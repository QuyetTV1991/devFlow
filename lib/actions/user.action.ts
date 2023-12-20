"use server";

import User, { IUser } from "@/database/user.model";
import { connectToDataBase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  ToggleSaveQuestionParams,
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

    if (!newUser) throw new Error("not found");

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
    const updatedUser = await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    if (!updatedUser) {
      throw new Error("not found user to update");
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

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDataBase();

    // Detructs the params
    // const { page = 1, pageSize = 20, filter, searchQuery } = params;

    // Find all users
    const users = await User.find({}).sort({ createdAt: -1 });

    if (!users) console.log("somethings went wrong");

    return { users };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserByMongoId(params: GetUserByIdParams) {
  try {
    connectToDataBase();
    const { userId } = params;
    // Find the user based on Mongo Id
    const user = await User.findById({ _id: userId });

    if (!user) console.log("cant found");

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function saveQuestion(params: ToggleSaveQuestionParams) {
  try {
    connectToDataBase();

    // Destructure params
    const { userId, questionId, path } = params;

    // Find user and update based on userId
    const user = await User.findById(userId);

    // If failed
    if (!user) throw new Error("Cannot find the user");

    if (user.saved.includes(questionId)) {
      user.saved.pull(questionId);
      user.save();
    } else {
      user.saved.push(questionId);
      user.save();
    }
    console.log(user.saved);

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
