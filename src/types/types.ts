// TypeScript Interfaces for the Sabbath School Study App Frontend

// --- Health Check ---
export interface PingResponse {
  status: string; // e.g. "ok"
  faiss_index_loaded: boolean; // true if FAISS index is in memory
  metadata_loaded: boolean; // true if metadata loaded
}

// --- Lesson Data ---
export interface DailySection {
  id: string;
  day: string;
  lesson_number: number;
  day_index: number;
  title: string;
  date: string;
  page_number: string;
  content: string[];
  memory_verse?: string;
  study_texts?: string;
}

export interface Lesson {
  id: string;
  lesson_number: number;
  title: string;
  week_start_date: string; // "YYYY-MM-DD"
  week_end_date: string; // "YYYY-MM-DD"
  memory_verse_reference: string;
  study_texts: string[];
  daily_sections: DailySection[];
}

export interface DailyTitle {
  day: string;
  title: string;
}

export interface LessonMetadata {
  id: string;
  title: string;
  lesson_number: number;
  week_start_date: string;
  week_end_date: string;
  daily_titles: DailyTitle[];
  discussion_question_count: number;
  has_egw_quotes: boolean;
  memory_verse_reference: string;
  study_texts: string[];
}

export interface LessonMetadataResponse {
  lesson_id: string;
  quarter: string; // e.g. "2023-Q4"
  year: string; // e.g. "2023"
  metadata: LessonMetadata;
}

// --- Search Results ---
export type DocumentType = "lesson-section" | "book-section";

export interface SearchResultBase {
  type: DocumentType;
  source: string;
  text: string;
  score: number;
  normalized_score: number;
  error?: string;
}

export interface LessonSearchResult extends SearchResultBase {
  type: "lesson-section";
  lesson_id: string;
  lesson_number: number;
  week_end_date: string;
  day_index: number;
  day_title: string;
}

export interface BookSearchResult extends SearchResultBase {
  type: "book-section";
  book_title?: string;
  page_number?: string;
  // any other book-specific metadata fields
}

export type SearchResult = LessonSearchResult | BookSearchResult;

export interface SearchResponse {
  query: string;
  results: SearchResult[];
  count: number;
  filter: "all" | "lesson" | "book";
}

// --- LLM Generic Endpoint ---
export type LLMModes = "explain" | "reflect" | "apply" | "summarize" | "ask";

export interface LLMRequest {
  text: string;
  mode: LLMModes;
}

export interface LLMResponse {
  result: string;
}

// --- Retrieval-Augmented Q&A ---
export interface QARequest {
  question: string;
  top_k: number;
  lang: "en" | "es";
}

export interface QAResponse {
  question: string;
  answer: string;
  context_used: number;
  /**
   * RAG reference map: chunk index → reference string
   * e.g. { "0": "Lesson-6-MAYO10-..." }
   */
  rag_refs: Record<string, string>;
}

// --- Admin Endpoints ---
export interface ReindexResponse {
  status: "reindexed";
  index_loaded: boolean;
  metadata_loaded: boolean;
}

export interface AdminStatusResponse {
  index_loaded: boolean;
  metadata_count: number;
}

// --- API Error ---
export interface APIError {
  detail: string;
}
