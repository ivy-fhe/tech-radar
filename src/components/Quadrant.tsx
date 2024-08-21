import { Sector} from './Sector';
import { ReactNode, useState } from 'react';
import { CATEGORY_LOOKUP, createList } from '../util/QuadrantHelper';
import { Category, QuadrantItems, ExpState, SectorName } from '../util/enum-types';

import './Quadrant.css';


export const Quadrant = ({cat, quadrantItems, callback} : {cat: Category, quadrantItems: QuadrantItems, callback: (text: string) => void}) => {
    let qClass;
    const [expStatus, setExpStatus] = useState(ExpState[ExpState.collapsed]);
    const itemList: Array<ReactNode> = createList(quadrantItems);

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
            <div className={"quadrant " + expStatus + qClass} onClick={() => setExpStatus(ExpState[ExpState.expanded])}>
                <div className='itemListWrapper'>
                    {itemList}
                </div>
                <p className='quadrantTitle'>{CATEGORY_LOOKUP.get(cat)}</p>
                <button className='closeBtn' type='submit' onClick={(event) => {
                    event.stopPropagation();
                    setExpStatus(ExpState[ExpState.collapsed]);
                }}>&#10005;</button>
                <Sector sectorName={SectorName.Hold} quadrant={cat} items={quadrantItems.hold} styleClass={qClass} callback={callback} expanded={ExpState[ExpState.expanded] === expStatus}/>
                <Sector sectorName={SectorName.Trial} quadrant={cat} items={quadrantItems.trial} styleClass={qClass} callback={callback} expanded={ExpState[ExpState.expanded] === expStatus}/>
                <Sector sectorName={SectorName.Specific} quadrant={cat} items={quadrantItems.specific} styleClass={qClass} callback={callback} expanded={ExpState[ExpState.expanded] === expStatus}/>
                <Sector sectorName={SectorName.Adopt} quadrant={cat} items={quadrantItems.adopt} styleClass={qClass} callback={callback} expanded={ExpState[ExpState.expanded] === expStatus}/>
            </div>
        </>
    )   
}
