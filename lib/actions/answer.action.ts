"use server";

import Answer from "@/database/answer.model";
import { connectToDataBase } from "../mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

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
    const { questionId } = params;

    // Get all answer by questionId
    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });

    // If Failed
    if (!answers || answers.length === 0)
      throw new Error("cannot get all question from questionId");

    return { answers };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
