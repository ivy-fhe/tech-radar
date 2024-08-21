
export const getCssVar = (name: string) =>  window.getComputedStyle(document.documentElement).getPropertyValue(name);