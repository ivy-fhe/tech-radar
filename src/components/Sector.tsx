import './Sector.css';
export enum SectorName {
    Trial,
    Adopt,
    Specific,
    Hold,
}


export const Sector = ({name, items, styleClass} : {name : SectorName, items: Array<string>, styleClass: string}) => {


    return (
        <div className={"sector " +  SectorName[name].toLocaleLowerCase() + " " + styleClass + "Sector"}>
            <p>{name}</p>
            {items}
        </div>
    )
}