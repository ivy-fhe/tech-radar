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
    const gen = (e: string|number, gSwitch : boolean = false) => {
        count++;
        return {
            name: "0".repeat(2-(count+"").length) + count,
            description: gSwitch ? e+"" : "description of point " + count,
            id: crypto.randomUUID(),
            icon: e == 5 ? 'docker.svg' : undefined
        }
    };

    const items: QuadrantItems = {
        adopt: git? git.map(e => gen(e, true)) : numbers.map(e => gen(e)),
        specific: numbers.map(e => gen(e)),
        trial: numbers.map(e => gen(e)),
        hold: numbers.map(e => gen(e)),
    }
    return items;
}