import { ReactNode } from 'react';
import './Sector.css';
export enum SectorName {
    Adopt,
    Specific,
    Trial,
    Hold,
}


export const Sector = ({name, items, styleClass} : {name : SectorName, items: Array<string>, styleClass: string}) => {
    const points : Array<ReactNode>= [];
    const min = 100 * name + 10;
    const locs = [];
    for(let i = 0; i < items.length; i++){
        let location = calculateLocation(min, name, styleClass);
        locs.push(location);
        
    }
    locs.forEach((l, i) => points.push(<div className='point' style={l}>{items[i]}</div>));

    
    return (
        <div className={"sector " +  SectorName[name].toLocaleLowerCase() + " " + styleClass + "Sector"}>
            {points}
        </div>
    )
}

const calculateLocation = (min: number, name: number, styleClass: string) => {
    const angle = Math.floor(Math.random() * 90) + name * 90;
    const offset = Math.random() * 70;
    const point = min + offset;
    let location;
    const vector = [Math.abs(Math.cos(-angle) * 0 - Math.sin(-angle) * point), Math.abs(Math.sin(-angle) * 0 + Math.cos(-angle)*point)];
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