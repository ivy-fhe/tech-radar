import { useState } from "react";
import { Category, Quadrant, type QuadrantItems } from "./Quadrant"
import './TechRadar.css'

export type Point = {
    name: string,
    description: string,
    id: string
}
const numbers = [];
for(let i = 0; i < 20; i++){
    numbers.push(i);
}

const items: QuadrantItems = {
    hold: numbers.map(e =>  {
        return {
            name: e+"",
            description: "description of point " + e,
            id: crypto.randomUUID() 
        }
    }),
    trial: numbers.map(e =>  {
        return {
            name: e+"",
            description: "description of point " + e,
            id: crypto.randomUUID() 
        }
    }),
    specific: numbers.map(e =>  {
        return {
            name: e+"",
            description: "description of point " + e,
            id: crypto.randomUUID() 
        }
    }),
    adopt: numbers.map(e =>  {
        return {
            name: e+"",
            description: "description of point " + e,
            id: crypto.randomUUID() 
        }
    }),
}

export const TechRadar = () => {
    const [infoText, setInfoText] = useState('');
    const callback : (text: string) => void = (text) => {
        setInfoText(text);
    }

    return (
        <>
        <p className="pointInfo">{infoText}</p>
        <div className="techRadar">
            <Quadrant cat={Category.Techniques} quadrantItems={items} callback={callback}/>
            <Quadrant cat={Category.Platforms} quadrantItems={items} callback={callback}/>
            <Quadrant cat={Category.LanguagesFrameworks} quadrantItems={items} callback={callback}/>
            <Quadrant cat={Category.Tools} quadrantItems={items} callback={callback}/>
        </div>
        </>
        
    )
}