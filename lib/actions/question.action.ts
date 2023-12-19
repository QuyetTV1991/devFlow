"use server";

import Question from "@/database/question.model";
import { connectToDataBase } from "../mongoose";
import Tag from "@/database/tag.model";
import {
  CreateQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
} from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

export async function createQuestion(params: CreateQuestionParams) {
  try {
    // connect to DB
    await connectToDataBase();

    const { title, content, tags, author, path } = params;

    // Create a question
    const question = await Question.create({
      title,
      content,
      author,
    });

    // Tags
    const tagDocuments = [];

    // Create tag or get them if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {
          name: { $regex: new RegExp(`^${tag}$`, "i") },
        },
        { $setOnInsert: { name: tag }, $push: { question: question._id } },
        {
          upsert: true,
          new: true,
        }
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // Create an interaction record for the user's ask-question action

    // Increment author's reputation by +5 for creating a question

    // Revalidate path
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDataBase();

    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    connectToDataBase();

    // destructure params
    const { questionId } = params;

    const question = await Question.findById(questionId)
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

    if (!question) {
      throw new Error("can not find the question");
    }

    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function VoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDataBase();

    // Destructure params
    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    // Find the question base on questionId
    const question = await Question.findById(questionId);

    // Check if question exists
    if (!question) throw new Error("Cannot find the question");

    // Update the upvote and downvote
    // If upvote
    if (hasupVoted && !hasdownVoted) {
      question.upvotes.push(userId);

      // Remove the userID from downvotes if they had previous downvote
      question.downvotes.pull(userId);
    }

    // If downvote
    if (hasdownVoted && !hasupVoted) {
      question.downvotes.push(userId);

      // Remove the userID from downvotes if they had previous downvote
      question.upvotes.pull(userId);
    }

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
