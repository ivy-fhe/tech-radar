import { Point } from "./enum-types";

export const handleHighlight = (element: Point, remove: boolean, callback: (str: string) => void) => {
    console.log("removing: " + remove);
    let htmlElements = document.getElementsByClassName(element.id);
    for(let i = 0; i < htmlElements.length; i++){
        if(remove){
            htmlElements[i].classList.remove('highlight');
            callback("");
        }else{
            htmlElements[i].classList.add('highlight');
            callback(element.description);
        }
    }
}