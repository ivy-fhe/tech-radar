import { useEffect, useState } from "react";
import './TechRadar.css'
import { getLang } from "../util/GithubLanguages";
import { QuadrantItems, Category } from "../util/enum-types";
import { Quadrant } from "./Quadrant";

const numbers: Array<number> = [];
for(let i = 0; i < 20; i++){
    numbers.push(i);
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


const items = createItems(numbers);


export const TechRadar = () => {
    const [infoText, setInfoText] = useState('');
    const callback : (text: string) => void = (text) => {
        setInfoText(text);
    }
    const [adopt, setAdopt] = useState(items);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const setData = async () => {
            let data = await getLang();
            setAdopt(createItems(numbers, Object.keys(data)));
            setLoading(false);
        }
        setData();
      }, []);

    return (
        <>
            {loading && <p>Loading...</p>}
            {!loading && <>
            <p className="pointInfo">{infoText}</p>
            <div className="techRadar">
                <Quadrant cat={Category.Techniques} quadrantItems={items} callback={callback}/>
                <Quadrant cat={Category.Platforms} quadrantItems={items} callback={callback}/>
                <Quadrant cat={Category.LanguagesFrameworks} quadrantItems={adopt} callback={callback}/>
                <Quadrant cat={Category.Tools} quadrantItems={items} callback={callback}/>
            </div>
            </>}    
        </>
    )
}