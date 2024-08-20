import { ReactNode } from 'react';
import { HOLD_POSITIONS, TRIAL_POSITIONS, SPECIFIC_POSITIONS, ADOPT_POSITIONS } from './Positions';
import './Sector.css';
import { Category } from './Quadrant';
import { Point } from './TechRadar';
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

export const Sector = ({sectorName, quadrant, items, styleClass, callback} : {sectorName : SectorName, quadrant: Category, items: Array<Point>, styleClass: string, callback: (text: string) => void}) => {
    let points: Array<ReactNode> = [];
    let p: number[][] = [];

    if(sectorName === SectorName.Hold) p = HOLD_POSITIONS[quadrant];
    if(sectorName === SectorName.Trial) p = TRIAL_POSITIONS[quadrant];
    if(sectorName === SectorName.Specific) p = SPECIFIC_POSITIONS[quadrant]
    if(sectorName === SectorName.Adopt) p = ADOPT_POSITIONS[quadrant]

    for(let i = 0; i < items.length && i < p.length; i++){
        let location = rotatePoint(100 * sectorName - 5, p[i], styleClass);
        points.push(
            <div onMouseEnter={() => callback(items[i].description)} onMouseLeave={() => callback('')} className='point' style={location}>
            <p className='pointLabel'>{items[i].name}</p>
        </div>
        );
    }

    return (
        <div className={"sector " +  SectorName[sectorName].toLocaleLowerCase() + " " + styleClass + "Sector"}>
            <p className={'sectorTitle'}>{SectorName[sectorName]}</p>
            {points}
        </div>
    )
}

const rotatePoint = (min: number, vec: number[], styleClass: string ) => {
    const point = min + vec[0];
    const angle = vec[1];
    const vector = [Math.abs(Math.cos(-angle) * 0 - Math.sin(-angle) * point), Math.abs(Math.sin(-angle) * 0 + Math.cos(-angle)*point)];
    let location;
    switch(styleClass.trim()){
        case 'topLeft':
            location = {
                bottom: vector[0] + "px",
                right: vector[1]+ "px"
            }
            break;
        case 'topRight':
            location = {
                bottom: vector[0]+ "px",
                left: vector[1]+ "px"
            }
            break;
        case 'bottomRight':
            location = {
                top: vector[0]+ "px",
                left: vector[1]+ "px"
            }
            break;
        case 'bottomLeft':
            location = {
                top: vector[0]+ "px",
                right: vector[1]+ "px"
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

const genPoints = () => {
    let all = [];
    let base;
    let step = base = 90 / 5;
    for(let j = 0; j < 4; j++) {
        let points = [];
        for(let i = 0; i < 4; i++){
            let offset = Math.random() * 80;
            points.push([offset, base + (i*step)]);
        }
        all.push(points);
    }
    
    console.log(all);
}
