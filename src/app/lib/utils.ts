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

export const DAILY_BIBLE_STUDY_VERSES: string[] = [
  "Salmos 119:105", // Lámpara es a mis pies tu palabra
  "2 Timoteo 3:16-17", // Toda la Escritura es inspirada por Dios
  "Josué 1:8", // Medita en ella de día y de noche
  "Salmos 1:2-3", // En su ley medita de día y de noche
  "Proverbios 4:20-22", // Atentos a mis palabras
  "Deuteronomio 6:6-7", // Enseña diligentemente a tus hijos
  "Hebreos 4:12", // La palabra de Dios es viva y eficaz
  "Romanos 10:17", // La fe viene por el oír
  "S. Mateo 4:4", // No solo de pan vivirá el hombre
  "Colosenses 3:16", // La palabra de Cristo more en abundancia
  "Santiago 1:22", // Sean hacedores de la palabra
  "Isaías 55:11", // Mi palabra no volverá vacía
  "Proverbios 2:1-6", // Si recibes mis palabras...
  "S. Juan 5:39", // Escudriñad las Escrituras
  "Hechos 17:11", // Examinaban cada día las Escrituras
  "2 Pedro 1:20-21", // Ninguna profecía es de interpretación privada
  "S. Mateo 7:24-25", // El que oye y hace es como hombre prudente
  "Salmos 19:7-11", // La ley de Jehová es perfecta
  "1 Pedro 2:2", // Como niños desead la leche espiritual
  "Isaías 34:16", // Buscad en el libro de Jehová y leed
  "Proverbios 3:5-6", // Confía en el Señor y no te apoyes en tu prudencia
  "Efesios 6:17", // La espada del Espíritu, que es la palabra de Dios
  "Filipenses 4:8-9", // Todo lo bueno, en esto pensad
  "S. Juan 17:17", // Santifícalos en tu verdad
  "Apocalipsis 1:3", // Bienaventurado el que lee y oye
  "Job 23:12", // Más que mi comida he guardado las palabras de su boca
  "Lucas 24:27", // Les interpretaba lo que de él decía la Escritura
  "Romanos 15:4", // Lo escrito para nuestra enseñanza
  "Salmos 119:11", // En mi corazón he guardado tus dichos
  "Isaías 30:21", // Oirás una voz detrás de ti
  "2 Corintios 4:6", // La luz del conocimiento de la gloria de Dios
  "S. Juan 8:31-32", // Permaneced en mi palabra
  "Hebreos 5:13-14", // El alimento sólido es para los maduros
  "Salmos 119:97", // ¡Cuánto amo tu ley!
  "S. Juan 6:63", // Las palabras que yo os he hablado son espíritu
  "Proverbios 6:20-23", // Ata tus palabras a tu corazón
  "1 Tesalonicenses 2:13", // Recibisteis la palabra como de Dios
  "Jeremías 15:16", // Fueron halladas tus palabras y yo las comí
  "Nehemías 8:8", // Leían claramente el libro de la ley
  "1 Crónicas 16:11", // Buscad al Señor y su poder
  "Isaías 66:2", // Aquel que tiembla a mi palabra
  "Lucas 11:28", // Bienaventurados los que oyen y guardan
  "Santiago 1:5", // Si alguno tiene falta de sabiduría
  "Proverbios 1:7", // El principio de la sabiduría es el temor de Jehová
  "1 Corintios 2:10", // Dios nos lo reveló por el Espíritu
  "S. Juan 14:26", // El Espíritu Santo os recordará todo
  "2 Timoteo 2:15", // Procura presentarte aprobado
  "Apocalipsis 3:20", // Estoy a la puerta y llamo
  "Salmos 143:8", // Hazme oír por la mañana tu misericordia
];

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
