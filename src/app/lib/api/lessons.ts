export async function getQuarters() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/quarters`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch quarters");
  }

  return response.json();
}

export async function getLessons(year?: string, quarter?: string) {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons`);

  if (year) url.searchParams.append("year", year);
  if (quarter) url.searchParams.append("quarter", quarter);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch lessons");
  }

  return response.json();
}
