import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DiskType } from '../../form/services/kii-api-upload-image.service';


export class DiskResult {
    /**Disk total size */
    totalSize : number = 0;

    /**removable total file size */
    removableSize : number = 0;

    /**Used file size */
    usedSize: number = 0;

    chart:any[] = [];
    

  constructor(obj: any | null) {
    if (obj) {
        Object.keys(this).forEach(key => {
            if (obj[key] != undefined) 
                this[key] = obj[key];
        });
    } 
  }
}

@Injectable({
  providedIn: 'root'
})

export class KiiAdminDiskService {
  private _progress = new BehaviorSubject<number>(0); //Stores the current upload progress for nginx and not nginx

  constructor(private http: HttpClient) { }

    /**Gets stats */
    public scan() :Observable<DiskResult> {
      return this.http.post(environment.apiURL + '/disk/scan', {}).pipe(map(res => new DiskResult(res)));
    }
    /**Gets stats */
    public optimize() :Observable<DiskResult> {
        return this.http.post(environment.apiURL + '/disk/optimize', {}).pipe(map(res => new DiskResult(res)));
    }


    /**Gets all images */
    public getImages(disk:DiskType) :Observable<string[]> {
      return this.http.post(environment.apiURL + '/disk/images/all', {disk:disk}).pipe(map((res:string[]) => res));
    }  
    
}
