"use server";

import Answer from "@/database/answer.model";
import { connectToDataBase } from "../mongoose";
import { CreateAnswerParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

export async function CreateAnswer(params: CreateAnswerParams) {
  connectToDataBase();
  try {
    // Destructure params
    const { content, author, question, path } = params;

    // create answer
    const newAnswer = new Answer({
      content,
      author,
      question,
    });

    // Populate Answer to Question
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    // TODO: add interaction...

    await newAnswer.save();
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
