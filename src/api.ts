import { MessageI } from "./types";

const API_BASE_URL = "http://localhost:3001";

export const fetchData = async (endpoint: string, params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const url = `${API_BASE_URL}/${endpoint}${
    queryString ? `?${queryString}` : ""
  }`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};

export const updateData = async (
  endpoint: string,
  data: any,
  method = "POST"
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating data at ${endpoint}:`, error);
    throw error;
  }
};

export const getContactList = () => fetchData("contactList");

export const getMessages = (userId: string, contactId: string) => {
  const tag = [userId, contactId].sort().join("");
  return fetchData("messages", {
    tag,
    _sort: "timestamp",
    _order: "asc",
  });
};

export const addMessage = (message: MessageI) =>
  updateData("messages", message);
