import { SectorName, Sector} from './Sector';
import './Quadrant.css';

export enum Category {
    Techniques,
    Platforms,
    Tools,
    LanguagesFrameworks
}

export type QuadrantItems = {
    hold: Array<string>,
    trial: Array<string>,
    specific: Array<string>,
    adopt: Array<string>
}

export const Quadrant = ({cat, quadrantItems} : {cat: Category, quadrantItems: QuadrantItems}) => {
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
            <div className={"quadrant" + qClass}>
                <p className='quadrantTitle'>{Category[cat]}</p>
                <Sector name={SectorName.Hold} items={quadrantItems.hold} styleClass={qClass}/>
                <Sector name={SectorName.Trial} items={quadrantItems.trial} styleClass={qClass}/>
                <Sector name={SectorName.Specific} items={quadrantItems.specific} styleClass={qClass}/>
                <Sector name={SectorName.Adopt} items={quadrantItems.adopt} styleClass={qClass}/>
            </div>
        </>
    )
}