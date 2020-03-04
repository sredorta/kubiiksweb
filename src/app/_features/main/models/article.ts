import {Role, IRole} from "./role";
import { SafeHtml } from '@angular/platform-browser';

export interface IArticle {
    id: number;
    order:number;
    key:string;
    page:string;
    cathegory:string;
    disk:string;
    image:string;   //Contains principal image link
    public:boolean;
    title:string;
    description:string;
    content:string;
    hasPage:boolean;
    createdAt:string;
    updatedAt:string;
}

export class Article {
    id: number = null;
    order:number = 0;
    key:string = null;
    page:string=null;
    hasPage:boolean = false;
    cathegory:string = null;
    disk:string = null;
    image:string = null;   //Contains principal image link
    public:boolean = null;
    title:string = null;
    description:string = null;
    content:string = null;
    createdAt:string = null;
    updatedAt:string = null;

    private _isLoaded:boolean=false;

    constructor(obj: IArticle | null) {
        if (obj) {
            Object.keys(this).forEach(key => {
                if (obj[key] != undefined) 
                    this[key] = obj[key];
            });
            this._isLoaded = true;
        } 
    }

    /**Returns if article has been initialized or not */
    exists() {
        return this._isLoaded;
    }


    /**Updates current values */
    update(obj: any){
        if (obj) {
            Object.keys(this).forEach(key => {
                if (obj[key]) 
                    this[key] = obj[key];
            });
        } 
    }

    /**Extracts the current user and formats it to the interface required */
    to(format:string) {
        if (format == "IArticle")
        return <IArticle>JSON.parse(JSON.stringify(this));
    }

    /**REturns article image */
    public getImage() {
        if (this.image && this.image != "none") {
            return this.image;
        } else
            return './assets/kiilib/images/no-photo.svg';
    }

    /**Returns article image url*/
/*    public getImageUrl() {
        return 'url(' + this.getImage() + ')';
    }*/

}
