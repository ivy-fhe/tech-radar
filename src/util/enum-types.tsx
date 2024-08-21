export type Point = {
    name: string,
    description: string,
    id: string, 
    icon?: string
}

export type QuadrantItems = {
    hold: Array<Point>,
    trial: Array<Point>,
    specific: Array<Point>,
    adopt: Array<Point>
}

export enum Category {
    Techniques,
    Platforms,
    Tools,
    LanguagesFrameworks
}

export enum ExpState {
    collapsed,
    expanded
}

export enum SectorName {
    Adopt,
    Specific,
    Trial,
    Hold,
}