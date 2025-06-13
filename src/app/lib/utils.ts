import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { bible_api } from "./api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Map Spanish book names and common abbreviations to Spanish full book names (Reina-Valera 1960)
export const SPANISH_BOOK_MAP: Record<string, string> = {
  // Pentateuco
  Génesis: "Génesis",
  "Gén.": "Génesis",
  Éxodo: "Éxodo",
  "Éxo.": "Éxodo",
  Levítico: "Levítico",
  "Lev.": "Levítico",
  Números: "Números",
  "Núm.": "Números",
  Deuteronomio: "Deuteronomio",
  "Deut.": "Deuteronomio",
  // Libros históricos
  Josué: "Josué",
  "Jos.": "Josué",
  Jueces: "Jueces",
  "Jue.": "Jueces",
  Rut: "Rut",
  "1 Samuel": "1 Samuel",
  "1 Sam.": "1 Samuel",
  "2 Samuel": "2 Samuel",
  "2 Sam.": "2 Samuel",
  "1 Reyes": "1 Reyes",
  "1 Rey.": "1 Reyes",
  "2 Reyes": "2 Reyes",
  "2 Rey.": "2 Reyes",
  "1 Crónicas": "1 Crónicas",
  "1 Crón.": "1 Crónicas",
  "2 Crónicas": "2 Crónicas",
  "2 Crón.": "2 Crónicas",
  Esdras: "Esdras",
  "Esd.": "Esdras",
  Nehemías: "Nehemías",
  "Neh.": "Nehemías",
  Ester: "Ester",
  "Est.": "Ester",
  // Poéticos y sabiduría
  Job: "Job",
  Salmos: "Salmos",
  "Sal.": "Salmos",
  Proverbios: "Proverbios",
  "Prov.": "Proverbios",
  Eclesiastés: "Eclesiastés",
  "Ecl.": "Eclesiastés",
  Cantares: "Cantares",
  "Cant.": "Cantares",
  // Profetas mayores
  Isaías: "Isaías",
  "Isa.": "Isaías",
  Jeremías: "Jeremías",
  "Jer.": "Jeremías",
  Lamentaciones: "Lamentaciones",
  "Lam.": "Lamentaciones",
  Ezequiel: "Ezequiel",
  "Ezeq.": "Ezequiel",
  Daniel: "Daniel",
  "Dan.": "Daniel",
  // Profetas menores
  Oseas: "Oseas",
  "Os.": "Oseas",
  Joel: "Joel",
  "Jol.": "Joel",
  Amós: "Amós",
  "Am.": "Amós",
  Abdías: "Abdías",
  "Abd.": "Abdías",
  Jonás: "Jonás",
  "Jon.": "Jonás",
  Miqueas: "Miqueas",
  "Mic.": "Miqueas",
  Nahúm: "Nahúm",
  "Nah.": "Nahúm",
  Habacuc: "Habacuc",
  "Hab.": "Habacuc",
  Sofonías: "Sofonías",
  "Sof.": "Sofonías",
  Hageo: "Hageo",
  "Hag.": "Hageo",
  Zacarías: "Zacarías",
  "Zac.": "Zacarías",
  Malaquías: "Malaquías",
  "Mal.": "Malaquías",
  // Evangelios
  Mateo: "S. Mateo",
  "Mat.": "S. Mateo",
  Marcos: "S. Marcos",
  "Mr.": "S. Marcos",
  Lucas: "S. Lucas",
  "Luc.": "S. Lucas",
  Juan: "S. Juan",
  "Jn.": "S. Juan",
  Hechos: "Hechos",
  "Hech.": "Hechos",
  Romanos: "Romanos",
  "Rom.": "Romanos",
  "1 Corintios": "1 Corintios",
  "1 Cor.": "1 Corintios",
  "2 Corintios": "2 Corintios",
  "2 Cor.": "2 Corintios",
  Gálatas: "Gálatas",
  "Gal.": "Gálatas",
  Efesios: "Efesios",
  "Efe.": "Efesios",
  Filipenses: "Filipenses",
  "Fil.": "Filipenses",
  Colosenses: "Colosenses",
  "Col.": "Colosenses",
  "1 Tesalonicenses": "1 Tesalonicenses",
  "1 Tes.": "1 Tesalonicenses",
  "2 Tesalonicenses": "2 Tesalonicenses",
  "2 Tes.": "2 Tesalonicenses",
  "1 Timoteo": "1 Timoteo",
  "1 Tim.": "1 Timoteo",
  "2 Timoteo": "2 Timoteo",
  "2 Tim.": "2 Timoteo",
  Tito: "Tito",
  "Ti.": "Tito",
  Filemón: "Filemón",
  "Flm.": "Filemón",
  Hebreos: "Hebreos",
  "Heb.": "Hebreos",
  // Epístolas generales
  Santiago: "Santiago",
  "Sant.": "Santiago",
  "1 Pedro": "1 Pedro",
  "1 Pe.": "1 Pedro",
  "2 Pedro": "2 Pedro",
  "2 Pe.": "2 Pedro",
  "1 Juan": "1 Juan",
  "1 Jn.": "1 Juan",
  "2 Juan": "2 Juan",
  "2 Jn.": "2 Juan",
  "3 Juan": "3 Juan",
  "3 Jn.": "3 Juan",
  Judas: "Judas",
  // Apocalipsis
  Apocalipsis: "Apocalipsis",
  "Apoc.": "Apocalipsis",
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

export const generateContext = (
  passage: string,
  dayContent: string,
): string => {
  return `Having the following content: ${dayContent}\n  focus on the day part: ${passage}\n`;
};
