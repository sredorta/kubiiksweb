/**Setting interface */
export interface ISetting {
    id: number,
    key: string,
    type:string,
    value: string,
}


export class Setting {
    id:number = null;
    key:string = null;
    type:string = null;
    value:string = null;

    private _isLoaded:boolean=false;    //Gives if user has been initialized or not
    constructor(obj:ISetting | null) {
        if (obj) {
            Object.keys(this).forEach(key => {
                if (obj[key] != undefined) 
                    this[key] = obj[key];
            });
            this._isLoaded = true;
        } else {
            this.value = "";
        }
    }

    /**Returns if setting has been initialized or not */
    exists() {
        return this._isLoaded;
    }

    /**Returns a setting filtered by key */
    public static getByKey(key:string, settings:Setting[]) {
            if (settings.length<=0) {
              return new Setting(null);
            }
            let setting = settings.find(obj => obj.key == key);
            if (!setting) return new Setting(null);
            return setting;
    }  

}