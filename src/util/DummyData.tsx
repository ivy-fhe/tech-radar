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
    let count = 0;
    const gen = (e: string|number) => {
        count++;
        return {
            name: count+"",
            description: "description of point " + (git ? e : count),
            id: crypto.randomUUID() 
        }
    };

    const items: QuadrantItems = {
        adopt: git? git.map(e => gen(e)) : numbers.map(e => gen(e)),
        specific: numbers.map(e => gen(e)),
        trial: numbers.map(e => gen(e)),
        hold: numbers.map(e => gen(e)),
    }
    return items;
}