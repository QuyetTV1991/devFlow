"use server";

import Question from "@/database/question.model";
import { connectToDataBase } from "../mongoose";
import { SearchParams } from "./shared.types";
import User from "@/database/user.model";
import Answer from "@/database/answer.model";
import Tag from "@/database/tag.model";

const SearchableTypes = ["question", "user", "answer", "tag"];
export async function globalSearch(params: SearchParams) {
    try {
        connectToDataBase();

        // Destructure params
        const { query, type } = params;

        // Create Query
        const regexQuery = { $regex: query, $options: "i" };

        let results = [];

        // Define Model and Type can searchable
        const modelsAndTypes = [
            { model: Question, searchField: "title", type: "question" },
            { model: User, searchField: "name", type: "user" },
            { model: Answer, searchField: "content", type: "answer" },
            { model: Tag, searchField: "name", type: "tag" },
        ];

        const typeLower = type?.toLowerCase(); // In case type has Uppercase

        if (!typeLower || !SearchableTypes.includes(typeLower)) {
            // If no type => search accross everything, return each field 2 items
            for (const { model, searchField, type } of modelsAndTypes) {
                const queryResults = await model
                    .find({ [searchField]: regexQuery })
                    .limit(2);

                results.push(
                    ...queryResults.map((item) => ({
                        title:
                            type === "answer"
                                ? `Answers containing ${query}`
                                : item[searchField],
                        type,
                        id:
                            type === "user"
                                ? item.clerkId
                                : type === "answer"
                                    ? item.question
                                    : item._id,
                    }))
                );
            }
        } else {
            // If have type, search in specific Type (model)
            const modelInfo = modelsAndTypes.find((item) => item.type === typeLower);

            if (!modelInfo) {
                throw new Error("invalid search type");
            }

            const queryResults = await modelInfo.model
                .find({ [modelInfo.searchField]: regexQuery })
                .limit(8);

            results = queryResults.map((item) => ({
                title:
                    type === "answer"
                        ? `Answers containing ${query}`
                        : item[modelInfo.searchField],
                type,
                id:
                    type === "user"
                        ? item.clerkId
                        : type === "answer"
                            ? item.question
                            : item._id,
            }));
        }

        return JSON.stringify(results);
    } catch (error) {
        console.error(`Error fetching global results, ${error}`);
        throw error;
    }
}
