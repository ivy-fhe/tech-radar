import { useEffect, useState } from "react";
import './TechRadar.css'
import { getLang } from "../util/GithubLanguages";
import { Quadrant } from "./Quadrant";
import { createAdoptItems, createDummyitems } from "../util/DummyData";
import { Category } from "../util/enum-types";

export const TechRadar = () => {
    const items = createDummyitems();
    const [infoText, setInfoText] = useState('');
    const callback : (text: string) => void = (text) => {
        setInfoText(text);
    }
    const [adopt, setAdopt] = useState(items);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const setData = async () => {
            let data = await getLang();
            setAdopt(createAdoptItems(Object.keys(data)));
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