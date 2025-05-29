import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { bible_api } from "./api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SPANISH_BOOK_MAP: Record<string, string> = {
  // Pentateuch
  Génesis: "Genesis",
  "Gén.": "Genesis",
  Éxodo: "Exodus",
  "Éxo.": "Exodus",
  Levítico: "Leviticus",
  "Lev.": "Leviticus",
  Números: "Numbers",
  "Núm.": "Numbers",
  Deuteronomio: "Deuteronomy",
  "Deut.": "Deuteronomy",
  // Historical Books
  Josué: "Joshua",
  "Jos.": "Joshua",
  Jueces: "Judges",
  "Jue.": "Judges",
  Rut: "Ruth",
  "1 Samuel": "1 Samuel",
  "1 Sam.": "1 Samuel",
  "2 Samuel": "2 Samuel",
  "2 Sam.": "2 Samuel",
  "1 Reyes": "1 Kings",
  "1 Rey.": "1 Kings",
  "2 Reyes": "2 Kings",
  "2 Rey.": "2 Kings",
  "1 Crónicas": "1 Chronicles",
  "1 Crón.": "1 Chronicles",
  "2 Crónicas": "2 Chronicles",
  "2 Crón.": "2 Chronicles",
  Esdras: "Ezra",
  "Esd.": "Ezra",
  Nehemías: "Nehemiah",
  "Neh.": "Nehemiah",
  Ester: "Esther",
  "Est.": "Esther",
  // Poetic & Wisdom
  Job: "Job",
  Salmos: "Psalms",
  "Sal.": "Psalms",
  Proverbios: "Proverbs",
  "Prov.": "Proverbs",
  Eclesiastés: "Ecclesiastes",
  "Ecl.": "Ecclesiastes",
  Cantares: "Song of Solomon",
  "Cant.": "Song of Solomon",
  // Major Prophets
  Isaías: "Isaiah",
  "Isa.": "Isaiah",
  Jeremías: "Jeremiah",
  "Jer.": "Jeremiah",
  Lamentaciones: "Lamentations",
  "Lam.": "Lamentations",
  Ezequiel: "Ezekiel",
  "Ezeq.": "Ezekiel",
  Daniel: "Daniel",
  "Dan.": "Daniel",
  // Minor Prophets
  Oseas: "Hosea",
  "Os.": "Hosea",
  Joel: "Joel",
  Amós: "Amos",
  Abdías: "Obadiah",
  "Abd.": "Obadiah",
  Jonás: "Jonah",
  "Jon.": "Jonah",
  Miqueas: "Micah",
  "Mic.": "Micah",
  Nahúm: "Nahum",
  "Nah.": "Nahum",
  Habacuc: "Habakkuk",
  "Hab.": "Habakkuk",
  Sofonías: "Zephaniah",
  "Sof.": "Zephaniah",
  Hageo: "Haggai",
  "Hag.": "Haggai",
  Zacarías: "Zechariah",
  "Zac.": "Zechariah",
  Malaquías: "Malachi",
  "Mal.": "Malachi",
  // Gospels
  Mateo: "Matthew",
  "Mat.": "Matthew",
  Marcos: "Mark",
  "Mr.": "Mark",
  Lucas: "Luke",
  "Luc.": "Luke",
  Juan: "John",
  "Jn.": "John",
  // Acts
  Hechos: "Acts",
  "Hech.": "Acts",
  // Pauline Epistles
  Romanos: "Romans",
  "Rom.": "Romans",
  "1 Corintios": "1 Corinthians",
  "1 Cor.": "1 Corinthians",
  "2 Corintios": "2 Corinthians",
  "2 Cor.": "2 Corinthians",
  Gálatas: "Galatians",
  "Gal.": "Galatians",
  Efesios: "Ephesians",
  "Efe.": "Ephesians",
  Filipenses: "Philippians",
  "Fil.": "Philippians",
  Colosenses: "Colossians",
  "Col.": "Colossians",
  "1 Tesalonicenses": "1 Thessalonians",
  "1 Tes.": "1 Thessalonians",
  "2 Tesalonicenses": "2 Thessalonians",
  "2 Tes.": "2 Thessalonians",
  "1 Timoteo": "1 Timothy",
  "1 Tim.": "1 Timothy",
  "2 Timoteo": "2 Timothy",
  "2 Tim.": "2 Timothy",
  Tito: "Titus",
  Filemón: "Philemon",
  "Flm.": "Philemon",
  Hebreos: "Hebrews",
  "Heb.": "Hebrews",
  // General Epistles
  Santiago: "James",
  "Sant.": "James",
  "1 Pedro": "1 Peter",
  "1 Pe.": "1 Peter",
  "2 Pedro": "2 Peter",
  "2 Pe.": "2 Peter",
  "1 Juan": "1 John",
  "1 Jn.": "1 John",
  "2 Juan": "2 John",
  "2 Jn.": "2 John",
  "3 Juan": "3 John",
  "3 Jn.": "3 John",
  Judas: "Jude",
  // Revelation
  Apocalipsis: "Revelation",
  "Apoc.": "Revelation",
};

export async function fetchBibleText(ref: string): Promise<string> {
  if (!ref || typeof ref !== "string" || !ref.trim()) {
    console.warn("Invalid Bible reference input.");
    return "";
  }

  try {
    const parts = ref.trim().split(" ", 2);
    if (!parts[0]) {
      console.warn("Bible reference missing book information.");
      return "";
    }

    const bookPart = parts[0].trim();
    const chapterVerse = parts[1]?.trim() ?? "";
    const apiRef = `${SPANISH_BOOK_MAP[bookPart]} ${chapterVerse}`
      .trim()
      .replace(".", "");

    if (!apiRef) {
      console.warn("Incomplete Bible reference.");
      return "";
    }

    const response = await bible_api.get(
      `/${encodeURIComponent(apiRef.replace(/\s+/g, "+"))}`,
      {
        timeout: 5000,
      },
    );

    const data = response.data;

    if ("error" in data) {
      console.error(`API error: ${data.error}`);
      return "";
    }

    const verses: { text?: string }[] = data.verses ?? [];
    if (verses.length > 0) {
      const combined = verses.map((v) => v.text?.trim() ?? "").join(" ");
      const translation = data.translation_name ?? "";
      return `${ref} (${translation}): ${combined}`;
    }

    const fallbackText = data.text?.trim();
    if (fallbackText) return fallbackText;

    console.warn("No text found in API response.");
    return "";
  } catch (err: any) {
    if (axios.isAxiosError(err) && err.code === "ECONNABORTED") {
      console.error("Request to Bible API timed out.");
    } else {
      console.error("Unexpected error occurred in fetchBibleText:", err);
    }
    return "";
  }
}
