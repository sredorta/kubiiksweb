import { IEmailData } from '../../email-template/services/kii-email-template.service';

export interface IEmail {
    id:number;
    name:string;
    description:string;
    title:string;
    data:string;
    createdAt:string;
    updatedAt:string;
    isProtected:boolean;
}

export class Email {
    id:number = null;
    name:string = null;
    description:string = null;
    title:string = null;
    data:string;
    createdAt:string;
    updatedAt:string;
    isProtected:boolean;
    private _isLoaded:boolean=false;

    constructor(obj: IEmail | null) {
        if (obj) {
            this.id = obj.id;
            this.name = obj.name;
            this.description = obj.description;
            this.title = obj.title;
            this.data = obj.data;
            this.createdAt = obj.createdAt;
            this.updatedAt = obj.updatedAt;
            this.isProtected = obj.isProtected;
            this._isLoaded = true;
        } 
    }

    /**Returns if user has been initialized or not */
    exists() {
        return this._isLoaded;
    }

    getJson() {
        if (!this.data) return null;
        return <IEmailData>JSON.parse(this.data);
    }
}