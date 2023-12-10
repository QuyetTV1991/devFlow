'use server'

import Question from "@/database/question.model"
import { connectToDataBase } from "../mongoose"
import Tag from "@/database/tag.model"

export async function createQuestion(params: any) {

   try {
      //connect to DB
      await connectToDataBase()

      const { title, content, tags, author, path } = params

      //Create a question
      const question = await Question.create({
         title, content, author
      })

      // Tags
      const tagDocuments = []

      // Create tag or get them if they already exist
      for (const tag of tags) {
         const existingTag = await Tag.findOneAndUpdate(
            {
               name: { $regex: new RegExp(`^${tag}$`, 'i') }
            },
            { $setOnInsert: { name: tag }, $push: { question: question._id } },
            {
               upsert: true, new: true
            })

         tagDocuments.push(existingTag._id)
      }

      await Question.findByIdAndUpdate(question._id, {
         $push: { tags: { $each: tagDocuments } }
      })

      // Create an interaction record for the user's ask-question action

      // Increment author's reputation by +5 for creating a question

   } catch (error) {
      console.log(error)
   }
}