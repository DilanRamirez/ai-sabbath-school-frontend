// Ensure you have an API client instance
import api from "../api";

/**
 * Result of a Bible reference lookup.
 */
export interface BibleReference {
  book: string;
  chapter: string;
  // For single-verse responses
  verse?: string;
  text?: string;
  // For ranged responses
  verses?: Record<string, string>;
}

/**
 * Fetches a verse or range of verses from the Bible reference endpoint.
 * @param ref - A string like "Mateo 12:9-14" or "2 Tim. 1:7"
 * @returns A Promise resolving to the BibleReference result.
 */
export async function fetchBibleReference(
  ref: string,
): Promise<BibleReference> {
  // Encode the reference string for use in a query parameter
  const encodedRef = encodeURIComponent(ref);
  // Make request by appending encoded ref directly to URL
  const response = await api.get<BibleReference>(
    `/bible/reference?ref=${encodedRef}`,
  );
  return response.data;
}
