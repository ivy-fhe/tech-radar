import { Category, Quadrant, type QuadrantItems } from "./Quadrant"
import './TechRadar.css'

const dummyItems = ['a', 'b', 'c', 'd'];

const items: QuadrantItems = {
    hold: dummyItems.map(e => e + " hold"),
    trial: dummyItems.map(e => e + " trial"),
    specific: dummyItems.map(e => e + " specific"),
    adopt: dummyItems.map(e => e + " adopt"),
}


export const TechRadar = () => {
    return (
        <div className="techRadar">
            <Quadrant cat={Category.Techniques} quadrantItems={items}/>
            <Quadrant cat={Category.Platforms} quadrantItems={items}/>
            <Quadrant cat={Category.LanguagesFrameworks} quadrantItems={items}/>
            <Quadrant cat={Category.Tools} quadrantItems={items}/>
        </div>
    )
}