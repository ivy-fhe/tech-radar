import { SectorName, Sector} from './Sector';
import './Quadrant.css';

export const enum Category {
    Techniques,
    Platforms,
    Tools,
    LanguagesFrameworks
}

export const Quadrant = ({cat} : {cat: Category}) => {
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
        <div className={"quadrant" + qClass}>
            <Sector name={SectorName.Adopt} items={[]} styleClass={qClass}/>
            <Sector name={SectorName.Specific} items={[]} styleClass={qClass}/>
            <Sector name={SectorName.Trial} items={[]} styleClass={qClass}/>
            <Sector name={SectorName.Hold} items={[]} styleClass={qClass}/>
        </div>
    )
}