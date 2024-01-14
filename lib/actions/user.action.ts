/* eslint-disable no-unused-vars */
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
  GetSavedQuestionsParams,
  GetUserStatsParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import { FilterQuery } from "mongoose";
import Answer from "@/database/answer.model";

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
    const { searchQuery, filter, page = 1, pageSize = 10 } = params;

    // Calculate skipAmount
    const skipAmount = (page - 1) * pageSize;

    // Create Query
    const query: FilterQuery<typeof User> = {};
    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { username: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortOption = {};
    switch (filter) {
      case "new_users":
        sortOption = { joinedAt: -1 };
        break;
      case "old_users":
        sortOption = { joinedAt: 1 };
        break;
      case "top_contributors":
        sortOption = { reputation: -1 };
        break;
      default:
        break;
    }

    // Find users based on query, if no search, return all users
    const users = await User.find(query)
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOption);

    if (!users) console.log("somethings went wrong when fetch users");

    // Calculate isNext
    const totalUsers = await User.countDocuments(query);
    const isNext = totalUsers > skipAmount + users.length;

    return { users, isNext };
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
      // Remove question from saved
      await User.findByIdAndUpdate(
        userId,
        {
          $pull: { saved: questionId },
        },
        { new: true }
      );
    } else {
      // Add question to saved
      await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: { saved: questionId },
        },
        { new: true }
      );
    }

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getSavedQuestion(params: GetSavedQuestionsParams) {
  try {
    connectToDataBase();

    // Destructure params
    const { clerkId, searchQuery, filter, page = 1, pageSize = 10 } = params;

    // Calculate skipAmount
    const skipAmount = (page - 1) * pageSize;

    // Define Query
    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    let sortOption = {};
    switch (filter) {
      case "most_recent":
        sortOption = { createdAt: -1 };
        break;
      case "oldest":
        sortOption = { createdAt: 1 };
        break;
      case "most_voted":
        sortOption = { upvotes: -1 };
        break;
      case "most_viewed":
        sortOption = { views: -1 };
        break;
      case "most_answered":
        sortOption = { "answers.length": -1 };
        break;

      default:
        break;
    }

    // Find user by ClerkId and match with Search and Filter
    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        skip: skipAmount,
        limit: pageSize,
        sort: sortOption,
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    // If fail
    if (!user) throw new Error("User not found");

    const savedQuestions = user.saved;

    // Calculate isNext
    const totalSavedQuestions = await User.aggregate([
      {
        $match: {
          clerkId,
        },
      },
      {
        $project: {
          count: { $size: "$saved" },
        },
      },
    ]);
    const isNext =
      totalSavedQuestions[0].count > skipAmount + savedQuestions.length;

    return { questions: savedQuestions, isNext };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    connectToDataBase();

    // Destructure params
    const { userId } = params;

    // Find user based on ClerkId
    const user = await User.findOne({ clerkId: userId });

    // If failed
    if (!user) throw new Error("User not found");

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });

    return {
      user,
      totalAnswers,
      totalQuestions,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getQuestionsByUserId(params: GetUserStatsParams) {
  try {
    connectToDataBase();

    // Destructure params
    const { userId, page = 1, pageSize = 10 } = params;

    // Calculate skipAmount
    const skipAmount = (page - 1) * pageSize

    // Count total Question
    const totalQuestions = await Question.countDocuments({ author: userId });

    // Find question base UserId (MongoDb _id)
    const questions = await Question.find({ author: userId })
      .skip(skipAmount)
      .limit(pageSize)
      .sort({ views: -1, upvotes: -1 })
      .populate({
        path: "tags",
        model: Tag,
        select: "_id name",
      })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });

    // If Failed
    if (!questions)
      throw new Error(
        "Something went wrong while fetching question from userID"
      );

    // Calculate isNext
    const isNext = totalQuestions > questions.length + skipAmount

    return { questions, totalQuestions, isNext };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAnswersByUserId(params: GetUserStatsParams) {
  try {
    connectToDataBase();

    // Destructure params
    const { userId, page = 1, pageSize = 10 } = params;

    // Calculate skipAmount
    const skipAmount = (page - 1) * pageSize

    // Count total Answer
    const totalAnswers = await Answer.countDocuments({ author: userId });

    // Find question base UserId (MongoDb _id)
    const answers = await Answer.find({ author: userId })
      .skip(skipAmount)
      .limit(pageSize)
      .sort({ upvotes: -1 })
      .populate({
        path: "question",
        model: Question,
        select: "_id title",
      })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });

    // If Failed
    if (!answers)
      throw new Error(
        "Something went wrong while fetching answers from userID"
      );

    // Calculate isNext
    const isNext = totalAnswers > answers.length + skipAmount

    return { answers, totalAnswers, isNext };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
