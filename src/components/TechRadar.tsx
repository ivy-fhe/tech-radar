import { useState } from "react";
import { Category, Quadrant, type QuadrantItems } from "./Quadrant"
import './TechRadar.css'

export type Point = {
    name: string,
    description: string,
}

const dummyItems: Array<Point> = ['a', 'b', 'c', 'd', 'e', 'f', 'h', 'i', 'j', 'k'].map(e =>  {
    return {
        name: e,
        description: "description of point " + e
    }
});;

const items: QuadrantItems = {
    hold: dummyItems,
    trial: dummyItems,
    specific: dummyItems,
    adopt: dummyItems,
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