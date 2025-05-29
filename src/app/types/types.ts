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

/** Union of all section types */
export type LessonSection =
  | ReadingSection
  | MemoryVerseSection
  | ParagraphSection
  | BibleQuestionSection
  | QuoteSection
  | DiscussionQuestionsSection;

/** One day’s worth of lesson content */
export interface LessonDay {
  day: string; // e.g. "Sábado", "Domingo", …
  date: string; // ISO date
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

export enum SectionType {
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
