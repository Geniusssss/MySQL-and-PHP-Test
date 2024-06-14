// Define the base URL for the API
const API_URL = "http://localhost:8000";

// Fetch enrolment data from the API with optional pagination and filters
export const fetchEnrolments = async (limit, offset, userFilter, courseFilter) => {
  // Handle exceptions
  try {
    const params = new URLSearchParams({
      limit,
      offset,
      userFilter: userFilter || '',
      courseFilter: courseFilter || ''
    });
    // Request with parameters
    const response = await fetch(`${API_URL}/enrolments?${params.toString()}`);

    // Throw an exception if the response is not ok
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // Log the error and throw an exception to the caller module
    console.error('Failed to fetch enrolments:', error);
    throw error;
  }
};

// Fetch matching user list based on the keyword
export const fetchMatchingUsers = async (keyword) => {
  // Handle exceptions
  try {
    const response = await fetch(`${API_URL}/users?q=${keyword}`);

    // Throw an exception if the response is not ok
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // Log the error and throw an exception to the caller module
    console.error('Failed to fetch matching users:', error);
    throw error;
  }
};

// Fetch matching course list based on the keyword
export const fetchMatchingCourses = async (keyword) => {
  // Handle exceptions
  try {
    const response = await fetch(`${API_URL}/courses?q=${keyword}`);

    // Throw an exception if the response is not ok
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // Log the error and throw an exception to the caller module
    console.error('Failed to fetch matching courses:', error);
    throw error;
  }
};
