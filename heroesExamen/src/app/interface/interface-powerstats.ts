/**
 * Interfaz que define las estadísticas de poder de un héroe.
 * Los valores suelen oscilar entre 0 y 100.
 */
export interface InterfacePowerstats {
    id?: number;
    intelligence: number; // Inteligencia
    strength: number;     // Fuerza
    speed: number;        // Velocidad
    durability: number;   // Resistencia
    power: number;        // Poder
    combat: number;       // Combate
}
