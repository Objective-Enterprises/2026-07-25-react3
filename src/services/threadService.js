import { fetchAPI } from "../api/apiClient";
import { THREAD_API } from "../config/apiConfig";

export async function fetchRecentThreads() {
  const response = await fetchAPI(THREAD_API.GET_ALL)
  return response.data
}

export async function fetchThreadById(threadId) {
  const url = THREAD_API.GET_BY_ID(threadId);
  const response = await fetchAPI(url)
  return response.data
}

export const createThread = async (data) => {
  const body = JSON.stringify(data);
  const response = await fetchAPI(THREAD_API.CREATE, {
    method: 'POST',
    body
  })
  return response.data
};

export async function upvoteThread(threadId) {
  const url = THREAD_API.UPVOTE(threadId);
  const response = await fetchAPI(url, {
    method: 'POST',
  });
  return response.data;
}

export async function downvoteThread(threadId) {
  const url = THREAD_API.DOWNVOTE(threadId);
  const response = await fetchAPI(url, {
    method: 'POST',
  });
  return response.data;
}
