import { ReactNode } from 'react';
import { HOLD_POSITIONS, TRIAL_POSITIONS, SPECIFIC_POSITIONS, ADOPT_POSITIONS } from './Positions';
import './Sector.css';
import { Category } from './Quadrant';
import { Point } from './TechRadar';
import { getCssVar } from '../util/Size';
export enum SectorName {
    Adopt,
    Specific,
    Trial,
    Hold,
}

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
        allPos = genPoints();
        localStorage.setItem(storageKey, JSON.stringify(Array.from(allPos.entries())));
    }
    

    if(sectorName === SectorName.Hold) p = allPos.get(3);
    if(sectorName === SectorName.Trial) p = allPos.get(2);
    if(sectorName === SectorName.Specific) p = allPos.get(1);
    if(sectorName === SectorName.Adopt) p = allPos.get(0);

    for(let i = 0; i < items.length && i < p.length; i++){
        let height = window.innerHeight / 10;
        let location = rotatePoint(height * sectorName, p[i], styleClass);
        points.push(
            <div onMouseEnter={() => callback(items[i].description)} onMouseLeave={() => callback('')} className='point' style={location}>
                <p className='pointLabel'>{items[i].name}</p>
            </div>
        );
    }

    const storageKeyExp = "quadExp"+quadrant+sectorName;
    let expString = localStorage.getItem(storageKeyExp);
    let expLoc;
    if(expString){
        expLoc = JSON.parse(expString);
    }else {
        expLoc = expLocations(items.length, expSizes[sectorName-1]/2+2 ?? 0);
        localStorage.setItem(storageKeyExp, JSON.stringify(expLoc));
    }
    


    for(let i = 0; i < items.length; i++){
        const location = {
            top: expLoc[i][0] + expSizes[sectorName]/2 + "vh",
            right: -expLoc[i][1]+"vh",
            translate: "transformY(-200%)"
        };
        expPoints.push(
            <div onMouseEnter={() => callback(items[i].description)} onMouseLeave={() => callback('')} className='point' style={location}>
                <p className='pointLabel'>{items[i].name}</p>
            </div>
        );
    }

    return (
        <div className={"sector " +  SectorName[sectorName].toLocaleLowerCase() + " " + styleClass + "Sector"}>
            <p className={'sectorTitle'}>{SectorName[sectorName]}</p>
            <div className='pointContainer'>
                {expanded ? expPoints : points}
            </div>
        </div>
    )
}

const rotatePoint = (min: number, vec: number[], styleClass: string ) => {
    const height = window.innerHeight;
    const vh = height / 100;
    min -= vh;
    const point = min + vec[0];
    const angle = vec[1] * (Math.PI/180);
    let vector = [Math.abs(Math.cos(-angle) * 0 - Math.sin(-angle) * point), Math.abs(Math.sin(-angle) * 0 + Math.cos(-angle)*point)];
    vector = [vector[0] / vh, vector[1] / vh];
    let location;
    switch(styleClass.trim()){
        case 'topLeft':
            location = {
                bottom: vector[0] + "vh",
                right: vector[1]+ "vh"
            }
            break;
        case 'topRight':
            location = {
                bottom: vector[0]+ "vh",
                left: vector[1]+ "vh"
            }
            break;
        case 'bottomRight':
            location = {
                top: vector[0]+ "vh",
                left: vector[1]+ "vh"
            }
            break;
        case 'bottomLeft':
            location = {
                top: vector[0]+ "vh",
                right: vector[1]+ "vh"
            }
            break;
        default:
            location = {
                top: "100px",
                left: "100px"
            }
    }
    return location;
}

const expLocations = (count: number, min: number) => {
    let p = [];
    
    let start = [min, 0];
    let degStep = 180/(count+1);
    for(let i = 1; i <= count; i++){
        let o = Math.random()*(25/2-4);
        let angle = (degStep*i) * (Math.PI/180);
        let y = start[0]+o;
        let x = start[1];
        let x1 = Math.cos(angle) * x - Math.sin(angle) * y;
        let y1 = Math.sin(angle) * x + Math.cos(angle) * y;
        p.push([y1, x1]);
    }
    return p;
}

const genPoints = () => {
    let all = new Map();
    positions.forEach((v, k) => {
        let pos = v;
        let base;
        let step = base = 90 / (pos + 1);
        let points = [];
        for(let i = 0; i < pos; i++){
            let offset = Math.random() * 80;
            points.push([offset, base + (i*step)]);
        }
        all.set(Number(k), points);
    });
    return all;
}