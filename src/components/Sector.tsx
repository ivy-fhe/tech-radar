import { ReactNode } from 'react';
import { getCssVar } from '../util/Size';
import { SectorName } from '../util/enum-types';
import { Category, Point } from '../util/enum-types';

import './Sector.css';
import { genPoints, rotatePoint, createPoint, expLocations } from '../util/SectorHelper';

const positions = new Map<SectorName, number>();
positions.set(SectorName.Hold, 10);
positions.set(SectorName.Trial, 8);
positions.set(SectorName.Specific, 6);
positions.set(SectorName.Adopt, 4);

export const Sector = ({sectorName, quadrant, items, styleClass, callback, expanded} : {sectorName : SectorName, quadrant: Category, items: Array<Point>, styleClass: string, callback: (text: string) => void, expanded: boolean}) => {
    const expOffset = Number(getCssVar("--radius-diff-expanded").replace("vh", ""))/2;
    const maxExp = Number(getCssVar("--hold-expanded").replace("vh", ""));
    const expSizes = [maxExp, maxExp-(2*expOffset), maxExp-(2*expOffset)*2, maxExp-(2*expOffset)*3].reverse();

    let points: Array<ReactNode> = [];
    const expPoints: Array<ReactNode> = [];
    let p: number[][] = [];

    const storageKey = "quad"+quadrant;
    let string = localStorage.getItem(storageKey);
    let allPos;
    if(string){
        allPos = new Map(JSON.parse(string)); 
    }else{
        allPos = genPoints(positions);
        localStorage.setItem(storageKey, JSON.stringify(Array.from(allPos.entries())));
    }
    
    if(sectorName === SectorName.Hold) p = allPos.get(3);
    if(sectorName === SectorName.Trial) p = allPos.get(2);
    if(sectorName === SectorName.Specific) p = allPos.get(1);
    if(sectorName === SectorName.Adopt) p = allPos.get(0);

    for(let i = 0; i < items.length && i < p.length; i++){
        let height = window.innerHeight / 10;
        let location = rotatePoint(height * sectorName, p[i], styleClass);
        points.push(createPoint(items[i], location, callback));
    }

    const storageKeyExp = "quadExp"+quadrant+sectorName;
    let expString = localStorage.getItem(storageKeyExp);
    let expLoc;
    if(expString){
        expLoc = JSON.parse(expString);
    }else {
        let min = expSizes[sectorName-1]/2+2;
        min = isNaN(min) ? 0 : min;
        expLoc = expLocations(items.length,  min ?? 0);
        localStorage.setItem(storageKeyExp, JSON.stringify(expLoc));
    }

    for(let i = 0; i < items.length; i++){
        const location = {
            top: expLoc[i][0] + expSizes[sectorName]/2 + "vh",
            right: -expLoc[i][1]+"vh",
        };
        expPoints.push(createPoint(items[i], location, callback));
    }

    return (
        <div className={"sector " +  SectorName[sectorName].toLocaleLowerCase() + " " + styleClass + "Sector"}>
            <p className={'sectorTitle'}>{SectorName[sectorName]}</p>
            {expanded ? expPoints : points}
        </div>
    )
}

