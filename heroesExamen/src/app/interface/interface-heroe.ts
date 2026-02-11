import { InterfacePowerstats } from "./interface-powerstats";

/**
 * Interfaz que define la estructura de un Héroe/Personaje.
 * Mapea exactamente los campos que devuelve el backend (Characters entity).
 */
export interface InterfaceHeroe {
    id?: number;          // ID único (generado por la DB)
    heroname: string;     // Nombre de superhéroe (ej: Superman)
    fullname: string;     // Nombre real (ej: Clark Kent)
    image1: string;       // URL de la imagen principal
    image2: string;       // URL de la imagen secundaria
    image3: string;       // URL de la imagen terciaria
    gender: string;       // Género (Male/Female)
    race: string;         // Raza (Ej: Kryptonian)
    alignment: string;    // Alineación (Good/Bad/Neutral)
    powerstats: InterfacePowerstats; // Objeto con las estadísticas de poder
}
