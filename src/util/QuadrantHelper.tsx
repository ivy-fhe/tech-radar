import { ReactNode } from "react";
import { handleHighlight } from "./Highlight";
import { Category, QuadrantItems, Point } from "./enum-types";

export const CATEGORY_LOOKUP = new Map<Category, String>();
CATEGORY_LOOKUP.set(Category.Techniques, 'Techniques');
CATEGORY_LOOKUP.set(Category.Platforms, 'Platforms');
CATEGORY_LOOKUP.set(Category.Tools, 'Tools');
CATEGORY_LOOKUP.set(Category.LanguagesFrameworks, 'Languages and Frameworks');

export const createList = (quadrantItems: QuadrantItems) => {
    const itemList: Array<ReactNode> = [];

    let adopt = (
        <div className='listBox'>
            <h1>Adopt</h1>
            <ul>{quadrantItems.adopt.map(e => listItem(e))}</ul>
        </div>);
    
    let specific = (
        <div className='listBox'>
            <h1>Specific</h1>
            <ul>{quadrantItems.specific.map(e => listItem(e))}</ul>
        </div>);
    
    let trial = (
        <div className='listBox'>
            <h1>Trial</h1>
            <ul>{quadrantItems.trial.map(e => listItem(e))}</ul>
        </div>);
    
    let hold = (
        <div className='listBox'>
            <h1>Hold</h1>
            <ul>{quadrantItems.hold.map(e => listItem(e))}</ul>

        </div>);

    itemList.push(adopt);
    itemList.push(specific);
    itemList.push(trial);
    itemList.push(hold);
    
    return itemList;
}

const listItem = (e : Point) => {
    return(
        <li 
            className={e.id} 
            onMouseEnter={() => 
            handleHighlight(e, false, (_) => {})}
            onMouseLeave={() => 
                handleHighlight(e, true, (_) => {})}>
                <p>{e.name + " - " + e.description}</p>
        </li>
    )
}