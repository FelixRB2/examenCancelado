import { InterfacePowerstats } from "./interface-powerstats";

export interface InterfaceHeroe {
    id?: number;
    heroname: string;
    fullname: string;
    image1: string;
    image2: string;
    image3: string;
    gender: string;
    race: string;
    alignment: string;
    powerstats: InterfacePowerstats;
}

