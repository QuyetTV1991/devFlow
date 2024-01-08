import * as z from "zod";

export const QuestionFormSchema = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(20),
  tags: z.array(z.string().min(3).max(15)).min(1).max(5),
});

export const AnswerSchema = z.object({
  answer: z.string().min(100),
});

export const UserFormSchema = z.object({
  fullname: z.string().min(3).max(50),
  username: z.string().min(3).max(20),
  porfolio: z.string().url(),
  location: z.string().min(5).max(50),
  bio: z.string().min(10).max(200),
});
