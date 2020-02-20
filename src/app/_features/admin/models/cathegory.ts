export interface ICathegory {
    id: number;
    name:string;
    role:string;
}

export class Cathegory {
    id: number = null;
    name:string = "";
    role:string = "";


    constructor(obj: ICathegory | null) {
        if (obj) {
            Object.keys(this).forEach(key => {
                if (obj[key] != undefined) 
                    this[key] = obj[key];
            });
        } 
    }


}