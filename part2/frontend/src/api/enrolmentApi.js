const API_URL = "http://localhost:8000";

export const fetchEnrolments = async (limit, offset) => {
  const params = new URLSearchParams({
    limit,
    offset
  });
  const response = await fetch(`${API_URL}/enrolments?${params.toString()}`);
  const data = await response.json();
  return data;
};