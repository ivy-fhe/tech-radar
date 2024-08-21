import { SectorName, Sector} from './Sector';
import './Quadrant.css';
import { Point } from './TechRadar';
import { ReactNode, useState } from 'react';

export enum Category {
    Techniques,
    Platforms,
    Tools,
    LanguagesFrameworks
}

export const CATEGORY_LOOKUP = new Map<Category, String>();
CATEGORY_LOOKUP.set(Category.Techniques, 'Techniques');
CATEGORY_LOOKUP.set(Category.Platforms, 'Platforms');
CATEGORY_LOOKUP.set(Category.Tools, 'Tools');
CATEGORY_LOOKUP.set(Category.LanguagesFrameworks, 'Languages and Frameworks');

export type QuadrantItems = {
    hold: Array<Point>,
    trial: Array<Point>,
    specific: Array<Point>,
    adopt: Array<Point>
}

enum ExpState {
    collapsed,
    expanded
}

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
                <div className='itemList'></div>
                <p className='quadrantTitle'>{CATEGORY_LOOKUP.get(cat)}</p>
                <button className='closeBtn' type='submit' onClick={(event) => {
                    event.stopPropagation();
                    setExpStatus(ExpState[ExpState.collapsed]);
                }}>&#10005;</button>
                <Sector sectorName={SectorName.Hold} quadrant={cat} items={quadrantItems.hold} styleClass={qClass} callback={callback}/>
                <Sector sectorName={SectorName.Trial} quadrant={cat} items={quadrantItems.trial} styleClass={qClass} callback={callback}/>
                <Sector sectorName={SectorName.Specific} quadrant={cat} items={quadrantItems.specific} styleClass={qClass} callback={callback}/>
                <Sector sectorName={SectorName.Adopt} quadrant={cat} items={quadrantItems.adopt} styleClass={qClass} callback={callback}/>
            </div>
        </>
    )   
}

const createList = (quadrantItems: QuadrantItems) => {
    const itemList: Array<ReactNode> = [];

    let hold = (
        <div className='listBox'>
            <h1>Hold</h1>
            <ul>{quadrantItems.hold.map(e => <li>{e.name + " " + e.description}</li>)}</ul>
        </div>);
    itemList.push(hold);

    let trial = (
        <div className='listBox'>
            <h1>Trial</h1>
            <ul>{quadrantItems.trial.map(e => <li>{e.name + " " + e.description}</li>)}</ul>
        </div>);
    itemList.push(trial);

    let specific = (
        <div className='listBox'>
            <h1>Specific</h1>
            <ul>{quadrantItems.specific.map(e => <li>{e.name + " " + e.description}</li>)}</ul>
        </div>);
    itemList.push(specific);

    let adopt = (
        <div className='listBox'>
            <h1>Adopt</h1>
            <ul>{quadrantItems.adopt.map(e => <li>{e.name + " " + e.description}</li>)}</ul>
        </div>);
    itemList.push(adopt);
    return itemList;
}