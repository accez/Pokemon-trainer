


export interface PokemonListFromApi {
    results: Pokemon[]
}

export interface Pokemon {
    name: string;
    url: string;
    isDeleted?: boolean;
}

export interface PokemonDetailed {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: Sprite;
    stats: Stats[]

}

interface Sprite {
    front_default: string;
    back_default: string
}

interface Stats{
    base_stat:number;
    stat: Stat;
}
interface Stat{
    name:string
}