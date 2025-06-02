/* eslint-disable no-unused-vars */
/** Date range for the week */
export interface WeekRange {
  start: string; // ISO date, e.g. "2025-05-17"
  end: string; // ISO date, e.g. "2025-05-24"
}

/** Bible memory verse for the week */
export interface MemoryVerse {
  text: string;
  reference: string; // e.g. "Apoc. 14:1"
}

/** Base section common fields */
interface BaseSection {
  type: string;
}

/** “LEE PARA EL ESTUDIO” section */
export interface ReadingSection extends BaseSection {
  type: "reading";
  label: string;
  references: string[];
}

/** “PARA MEMORIZAR” section */
export interface MemoryVerseSection extends BaseSection {
  type: SectionType.MEMORY_VERSE;
  label: string;
  content: string;
}

/** Simple paragraph block */
export interface ParagraphSection extends BaseSection {
  type: SectionType.PARAGRAPH;
  content: string;
}

/** A section that asks a Bible question */
export interface BibleQuestionSection extends BaseSection {
  type: SectionType.BIBLE_QUESTION;
  label: string; // e.g. the reference(s)
  question: string;
  references?: string[]; // optional array of verse strings
}

/** Quote with attribution */
export interface QuoteSection extends BaseSection {
  type: SectionType.QUOTE;
  author: string;
  source: string;
  content: string;
}

/** Discussion questions list */
export interface DiscussionQuestionsSection extends BaseSection {
  type: SectionType.DISCUSSION_QUESTIONS;
  questions: string[];
}

export interface ReflectionSection extends BaseSection {
  type: SectionType.REFLECTION;
  label?: string; // optional label for the section
  questions: string[]; // main content of the reflection
  content?: string[]; // optional array of verse strings
}

/** Union of all section types */
export type LessonSection =
  | ReadingSection
  | MemoryVerseSection
  | ParagraphSection
  | BibleQuestionSection
  | QuoteSection
  | DiscussionQuestionsSection
  | ReflectionSection;
/** One day’s worth of lesson content */
export interface LessonDay {
  day: string; // e.g. "Sábado", "Domingo", …
  date: string; // ISO date
  rawMarkdown: string; // optional raw markdown content
  type:
    | LessonDayTypes.INTRODUCTION // Sábado
    | LessonDayTypes.DEVOTIONAL // Domingo–Jueves
    | LessonDayTypes.REVIEW; // Viernes
  title: string; // e.g. "Introducción" or devotional title
  sections: LessonSection[];
}

/** Full lesson for one week */
export interface LessonWeek {
  id: string; // e.g. "2025-05-24"
  lesson_number: number; // e.g. 8
  title: string; // e.g. "EN LOS SALMOS - PRIMERA PARTE"
  week_range: WeekRange;
  memory_verse: MemoryVerse;
  days: LessonDay[]; // 7 entries: Sábado–Viernes
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  role: "student" | "teacher";
  isLoggedIn: boolean; // optional, to track login state
  studyGroupId?: string; // optional, if applicable
}

export interface LoginResponse {
  access_token: string;
  token_type: "bearer";
  user: User;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: "student" | "teacher";
}

export interface RegisterResponse {
  status: "success";
  user_id: string;
}

export interface Quarter {
  year: string;
  slug: string;
  metadata: QuarterMetadata;
  cover_url: string | null;
}

export interface QuarterMetadata {
  slug: string;
  displayName: string;
  weekRange: {
    start: string;
    end: string;
  };
  coverKey: string;
}

export interface LessonMetadata {
  id: string;
  lesson_number: number;
  title: string;
  week_range: WeekRange;
  memory_verse: MemoryVerse;
}

export interface LessonsResponse {
  year: string;
  quarter: string;
  lesson_id: string;
  metadata: LessonMetadata;
}

export interface StudyProgressPayload {
  user_id: string;
  quarter: string; // e.g. "2025-Q2"
  lesson_id: string; // e.g. "lesson-07"
  day: string; // e.g. "saturday", "sunday", etc.
  note?: string; // optional note for the day
  cohort_id: string; // e.g. "COHORT#xyz"
  mark_studied: boolean; // true to mark the day as studied
}

export interface StudyProgressResponse {
  status: "updated" | "error";
  score: number;
  last_position: {
    quarter: string;
    lesson_id: string;
    day: string;
  };
}

export interface StudyProgressRecord {
  lesson_id: string;
  days_completed: string[]; // e.g. ["saturday", "sunday"]
  notes: { day: string; note: string }[];
  last_accessed: string; // ISO timestamp
  cohort_id: string;
  score: number;
  quarter: string;
}

export enum SectionType {
  REFLECTION = "reflection",
  READING = "reading",
  MEMORY_VERSE = "memory_verse",
  PARAGRAPH = "paragraph",
  BIBLE_QUESTION = "bible_question",
  QUOTE = "quote",
  DISCUSSION_QUESTIONS = "discussion_questions",
}

export enum LessonDayTypes {
  INTRODUCTION = "introduction", // Sábado
  DEVOTIONAL = "devotional", // Domingo–Jueves
  REVIEW = "review", // Viernes
}
