


export interface PokemonListFromApi{
    results:Pokemon[]
}

export interface Pokemon{
    name: string;
    url: string;
    isDeleted?:boolean;
}

export interface PokemonDetailed{
    id: number;
    name: string;
    height:number;
    sprites:Sprite
}

interface Sprite{
    front_default:string;
    back_default:string
}