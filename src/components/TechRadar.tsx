import { Category, Quadrant } from "./Quadrant"
import './TechRadar.css'

export const TechRadar = () => {
    return (
        <div className="techRadar">
            <Quadrant cat={Category.Techniques}/>
            <Quadrant cat={Category.Platforms}/>
            <Quadrant cat={Category.LanguagesFrameworks}/>
            <Quadrant cat={Category.Tools}/>
        </div>
    )
}