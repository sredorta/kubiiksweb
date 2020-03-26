export interface IOnpush {
    id:number;
    name:string;
    description:string;
    title:string;
    body:string;
    createdAt:string;
    updatedAt:string;
}

export class Onpush {
    id:number = null;
    name:string = null;
    description:string = null;
    title:string = null;
    body:string = null;
    createdAt:string;
    updatedAt:string;
    private _isLoaded:boolean=false;

    constructor(obj: IOnpush | null) {
        if (obj) {
            this.id = obj.id;
            this.name = obj.name;
            this.description = obj.description;
            this.title = obj.title;
            this.body = obj.body;
            this.createdAt = obj.createdAt;
            this.updatedAt = obj.updatedAt;
            this._isLoaded = true;
        } 
    }

    /**Returns if user has been initialized or not */
    exists() {
        return this._isLoaded;
    }

}