import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { bible_api } from "./api";
import { LessonDay, UserStudyNote } from "../types/types";
import MarkdownIt from "markdown-it";
import html2pdf from "html2pdf.js";

export const disclaimer: string = `## Descargo de responsabilidad

Esta aplicación está diseñada con fines educativos y espirituales, especialmente para el estudio de la Escuela Sabática. La información proporcionada por la aplicación —incluyendo explicaciones generadas por IA, referencias bíblicas y comentarios— debe usarse como apoyo para el estudio personal o en grupo, pero **no reemplaza** el estudio profundo de la Biblia, la oración ni la guía del Espíritu Santo.

Las interpretaciones ofrecidas pueden variar y **no deben considerarse** como una autoridad doctrinal oficial. Al usar esta aplicación, aceptas que es una herramienta complementaria y **no un sustituto** de la comunión con Dios ni de la dirección espiritual pastoral.

> **Importante:**  
> - Siempre verifica lo que dice la inteligencia artificial con la Biblia.  
> - No des por sentado nada.  
> - Este recurso te ayuda a entender mejor la lección y pasajes difíciles, pero **nunca debe sustituir** el estudio personal de la Palabra de Dios.`;

export const politicaPrivacidad: string = `# Política de Privacidad de Intelligent Sabbath+

## 1. Información que recopilamos  
Recopilamos los datos que nos proporcionas directamente al registrarte o usar la aplicación, como tu nombre, correo electrónico y credenciales de acceso. También registramos tu actividad dentro de la plataforma (lecciones vistas, progreso, preferencias).

## 2. Finalidad del tratamiento  
Utilizamos tu información para:  
- Proveer y mejorar nuestros servicios.  
- Personalizar tu experiencia de estudio.  
- Gestionar tu autenticación y seguridad de cuenta.  
- Enviarte notificaciones sobre tu progreso y novedades relevantes.  
- Realizar análisis internos y métricas de uso para optimizar la aplicación.

## 3. Compartir y divulgar información  
No vendemos, alquilamos ni comercializamos tu información personal. Podemos compartir datos con proveedores de servicios que actúan en nuestro nombre (por ejemplo, alojamiento de datos en la nube), siempre bajo estrictos acuerdos de confidencialidad y únicamente para los fines descritos aquí.

## 4. Seguridad de los datos  
Empleamos medidas de seguridad razonables, como cifrado TLS para proteger la información en tránsito y entornos seguros para su almacenamiento. Sin embargo, ningún sistema es infalible; por lo tanto, no podemos garantizar seguridad absoluta.

## 5. Cookies y tecnologías similares  
Usamos cookies y almacenamiento local para mantener tu sesión activa, recordar tus preferencias y recopilar datos de uso anónimos. Puedes configurar tu navegador para rechazarlas o eliminarlas, aunque algunas funciones de la aplicación podrían verse afectadas.

## 6. Retención de datos  
Conservamos tu información mientras tu cuenta esté activa y según sea necesario para cumplir con las finalidades descritas o para cumplir obligaciones legales. Podrás solicitar la eliminación de tus datos en cualquier momento (ver sección “Tus derechos”).

## 7. Tus derechos  
Tienes derecho a:  
1. Acceder a los datos personales que almacenamos sobre ti.  
2. Rectificar información inexacta o incompleta.  
3. Solicitar la supresión de tus datos personales.  
4. Oponerte al tratamiento de tus datos o solicitar su limitación.  
5. Solicitar la portabilidad de tus datos a otro responsable.  

Para ejercer estos derechos, por favor escribe a [soporte@intelligentsabbath.com](mailto:soporte@intelligentsabbath.com) o utiliza el formulario de contacto disponible en la aplicación.

## 8. Cambios a esta Política  
Podemos actualizar esta política de vez en cuando. Te notificaremos sobre cambios significativos mediante un aviso en la aplicación o por correo electrónico. La versión más reciente siempre estará disponible aquí.

## 9. Contacto  
Si tienes dudas o inquietudes sobre esta Política de Privacidad, contáctanos en:  
**Correo:** [soporte@intelligentsabbath.com](mailto:soporte@intelligentsabbath.com)  
**© 2025 Intelligent Sabbath+**`;
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

/**
 * Maps an array of AI-generated daily summaries to their corresponding user notes.
 * @param aiSummaries - The array of daily summary objects, each with a `day` field.
 * @param userNotes - The array of user notes, each with a `day` field matching summaries.
 * @returns A new array where each summary object is extended with a `notes` array.
 */
export function mapNotesToDays(
  aiSummaries: LessonDay[],
  userNotes: UserStudyNote[],
): string {
  // Group notes by their 'day' property for efficient lookup
  const notesByDay: Record<string, UserStudyNote[]> = userNotes.reduce(
    (acc, note) => {
      const key = note.day;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(note);
      return acc;
    },
    {} as Record<string, UserStudyNote[]>,
  );

  const report = aiSummaries.map((summary) => ({
    ...summary,
    notes: notesByDay[summary.day] ?? [],
  }));
  console.log("Mapped report with notes:", report);
  const htmlReport = formatReportForPdf(report);

  // Attach the array of notes (or empty) to each AI summary by matching day
  return htmlReport;
}

/**
 * Generates a Markdown string of the report, with day summaries and user notes,
 * ready to feed into a PDF renderer or Markdown viewer.
 */
export function formatReportForPdf(
  days: (LessonDay & { notes: UserStudyNote[] })[],
): string {
  return days
    .map((day) => {
      let md = "";
      // Lesson title if available
      if (day.title) {
        md += `# ${day.title}\n`;
      }
      md += `#### ${day.day} - ${day.date}\n\n`;

      // Day summary section
      const summary = day.daySummary;
      if (summary) {
        md += `### Resumen del día\n\n${summary.summary}\n\n`;

        // Key points
        if (summary.keyPoints?.length) {
          md += `### Puntos clave\n\n`;
          summary.keyPoints.forEach((point) => {
            md += `- ${point}\n`;
          });
          md += `\n`;
        }

        // Glossary terms
        if (summary.glossary) {
          md += `### Glosario\n\n`;
          Object.entries(summary.glossary).forEach(([term, definition]) => {
            md += `- **${term}**: ${definition}\n`;
          });
          md += `\n`;
        }

        // Citations
        if (summary.citations?.length) {
          md += `### Citaciones\n\n`;
          summary.citations.forEach((cit) => {
            md += `- ${cit.reference}\n`;
          });
          md += `\n`;
        }
      }

      // Main lesson content (raw Markdown)
      md += `${day.rawMarkdown}\n\n`;

      // User notes
      if (day.notes?.length) {
        md += `### Notas del usuario\n\n`;
        day.notes.forEach((note) => {
          md += `Pregunta: ${note.content}\n`;
          md += `Respuesta: ${note.note}\n`;
        });
        md += `\n`;
      }
      md += `---\n\n`; // Separator for each day
      return md;
    })
    .join("\n");
}

/**
 * Converts a Markdown string into a styled PDF and triggers a download.
 * @param markdown - The Markdown content to convert.
 * @param fileName - The desired PDF file name (default: "report.pdf").
 */
export async function downloadMarkdownAsPdf(
  markdown: string,
  fileName: string = "report.pdf",
): Promise<void> {
  // Render Markdown to HTML
  const mdParser = new MarkdownIt();
  const htmlContent = mdParser.render(markdown);

  // Create a container element for PDF generation
  const container = document.createElement("div");
  container.innerHTML = htmlContent;
  container.style.padding = "20px";
  container.style.fontFamily = "Arial, sans-serif";
  document.body.appendChild(container);

  // Generate and save PDF
  await html2pdf()
    .from(container)
    .set({
      margin: 10,
      filename: fileName,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    })
    .save();

  // Clean up
  document.body.removeChild(container);
}
