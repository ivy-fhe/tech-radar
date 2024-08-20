import { SectorName, Sector} from './Sector';
import './Quadrant.css';
import { Point } from './TechRadar';

export enum Category {
    Techniques,
    Platforms,
    Tools,
    LanguagesFrameworks
}

export type QuadrantItems = {
    hold: Array<Point>,
    trial: Array<Point>,
    specific: Array<Point>,
    adopt: Array<Point>
}

export const Quadrant = ({cat, quadrantItems, callback} : {cat: Category, quadrantItems: QuadrantItems, callback: (text: string) => void}) => {
    let qClass;
    switch(cat) {
        case Category.Techniques:
            qClass = ' topLeft';
            break;
        case Category.Platforms:
            qClass = ' topRight';
            break;
        case Category.Tools:
            qClass = ' bottomRight';
            break;
        case Category.LanguagesFrameworks:
            qClass = ' bottomLeft';
            break;
    }
    return (
        <>
            <div className={"quadrant"}>
                <div className={qClass}>
                <p className='quadrantTitle'>{Category[cat]}</p>
                    <Sector sectorName={SectorName.Hold} quadrant={cat} items={quadrantItems.hold} styleClass={qClass} callback={callback}/>
                    <Sector sectorName={SectorName.Trial} quadrant={cat} items={quadrantItems.trial} styleClass={qClass} callback={callback}/>
                    <Sector sectorName={SectorName.Specific} quadrant={cat} items={quadrantItems.specific} styleClass={qClass} callback={callback}/>
                    <Sector sectorName={SectorName.Adopt} quadrant={cat} items={quadrantItems.adopt} styleClass={qClass} callback={callback}/>
                </div>
                
            </div>
        </>
    )
}