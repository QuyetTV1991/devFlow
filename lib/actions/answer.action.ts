"use server";

import Answer from "@/database/answer.model";
import { connectToDataBase } from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Interaction from "@/database/interaction.model";

export async function CreateAnswer(params: CreateAnswerParams) {
  connectToDataBase();
  try {
    // Destructure params
    const { content, author, question, path } = params;

    // create answer
    const newAnswer = await Answer.create({
      content,
      author,
      question,
    });

    if (!newAnswer) throw Error("Answer was not create");

    // Populate Answer to Question
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    // TODO: add interaction...

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function GetAllAnswer(params: GetAnswersParams) {
  try {
    connectToDataBase();

    // Destructe params
    const { questionId, sortBy } = params;

    // Define Query || Sorting
    let sortOption = {};
    switch (sortBy) {
      case "highestUpvotes":
        sortOption = { upvotes: -1 };
        break;
      case "lowestUpvotes":
        sortOption = { upvotes: 1 };
        break;
      case "recent":
        sortOption = { createdAt: -1 };
        break;
      case "old":
        sortOption = { createdAt: 1 };
        break;

      default:
        break;
    }

    // Get all answer by questionId
    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort(sortOption);

    return { answers };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDataBase();

    // Destructure params
    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

    // use updateQuery to handle update
    let updateQuery = {};

    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    // Find and update the answer base on answerId
    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) throw new Error("Answer not found");

    // Increment author's reputation

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDataBase();

    // Destructure params
    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

    // use updateQuery to handle update
    let updateQuery = {};

    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    // Find and update the answer base on answerId
    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) throw new Error("Answer not found");

    // Increment author's reputation

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteAnswer(params: DeleteAnswerParams) {
  try {
    connectToDataBase();

    // Detructure params
    const { answerId, path } = params;

    // Find and delete Question from questionId
    const deleltedAnswer = await Answer.findById(answerId);

    // If failed
    if (!deleltedAnswer) throw new Error("Cannot find the answer to delete");

    // Delete the answer
    await deleltedAnswer.deleteOne();

    // Update related Databases
    await Question.updateMany(
      { _id: deleltedAnswer.question },
      { $pull: { answers: answerId } }
    );
    await Interaction.deleteMany({ answer: answerId });

    // Revalidate Path
    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
