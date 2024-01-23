import { GetJobsParams } from "@/lib/actions/shared.types";

export async function fetchJobs(params: GetJobsParams) {
  try {
    const { query = "web development", location = "MY", page = 1 } = params;

    const url = `https://jsearch.p.rapidapi.com/search?query=${query}&page=${page}&num_pages=1&country=${location}`;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "07c4382e13msh4ac030eef026115p108557jsnfa843319b92c",
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    };

    const response = await fetch(url, options);
    const result = await response.json();

    return { result };
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}
