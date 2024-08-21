import { Point } from "./enum-types";
import { SectorName } from "./enum-types";
import { handleHighlight } from "./Highlight";

export const createPoint = (e: Point, location: Object, callback: (str: string) => void) => {
    return(
        <div onMouseEnter={() => handleHighlight(e, false, callback)} onMouseLeave={() => handleHighlight(e, true, callback)} className={'point '+ e.id} style={location}>
            {e.icon ? <img src={new URL('../assets/' + e.icon, import.meta.url).href} alt="" /> : <p className='pointLabel'>{e.name}</p>}
        </div>
    );
}

export const rotatePoint = (min: number, vec: number[], styleClass: string ) => {
    const height = window.innerHeight;
    const vh = height / 100;
    min+=10;
    const point = min + vec[0];
    const angle = vec[1] * (Math.PI/180);
    let vector = [(Math.abs(Math.cos(-angle) * 0 - Math.sin(-angle) * point)) / vh, (Math.abs(Math.sin(-angle) * 0 + Math.cos(-angle)*point)) / vh];
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

export const expLocations = (count: number, min: number) => {
    let p = [];
    let start = [min, 0];
    let degStep = 180/(count+1);
    for(let i = 1; i <= count; i++){
        let o = Math.random()*(25/2-4);
        let angle = (180 - degStep*i) * (Math.PI/180);
        let y = start[0]+o;
        let x = start[1];
        let x1 = Math.cos(angle) * x - Math.sin(angle) * y;
        let y1 = Math.sin(angle) * x + Math.cos(angle) * y;
        p.push([y1, x1]);
    }
    return p;
}

export const genPoints = (positions: Map<SectorName, number>) => {
    let all = new Map();
    positions.forEach((v, k) => {
        let pos = v;
        let base;
        let step = base = 90 / (pos + 1);
        let points = [];
        
        for(let i = 0; i < pos; i++){
            let offset = Math.random() * 70;
            points.push([offset, base + (i*step)]);
        }
        all.set(Number(k), points);
    });
    return all;
}