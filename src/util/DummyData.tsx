import { QuadrantItems } from "./enum-types";

const numbers: Array<number> = [];
for(let i = 0; i < 20; i++){
    numbers.push(i);
}

export const createDummyitems = () => {
    return createItems(numbers);
}

export const createAdoptItems = (adoptItems: Array<string>) => {
    return createItems(numbers, adoptItems);
}


const createItems = (numbers: Array<number>, git?: Array<string>) => {
    const gen = (e: string|number) => {
        return {
            name: e+"",
            description: "description of point " + e,
            id: crypto.randomUUID() 
        }
    };

    const items: QuadrantItems = {
        hold: numbers.map(e => gen(e)),
        trial: numbers.map(e => gen(e)),
        specific: numbers.map(e => gen(e)),
        adopt: git? git.map(e => gen(e)) : numbers.map(e => gen(e))
    }
    return items;
}