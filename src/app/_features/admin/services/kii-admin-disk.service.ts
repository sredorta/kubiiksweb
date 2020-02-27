import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DiskType } from '../../form/services/kii-api-upload-image.service';


export class DiskResult {
    /**Disk total size */
    totalSize : number = 0;

    /**System files size */
    systemSize : number = 0;

    /**removable total file size */
    removableSize : number = 0;

    /**Disk chart */
    disk : any[] = [];


    /**Images chart */
    images : any[] = [];

    /**Videos chart */
    videos : any[] = [];

    /**Removable images Size */
    removableImagesSize : number = 0;

    /**Removable videos Size */
    removableVideosSize : number = 0;
    

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
    public scan() :Observable<any> {
      return this.http.post(environment.apiURL + '/disk/scan', {}).pipe(map(res => new DiskResult(res)));
    }
    /**Gets stats */
    public optimize() :Observable<any> {
        return this.http.post(environment.apiURL + '/disk/optimize', {}).pipe(map(res => new DiskResult(res)));
    }


    /**Gets all images */
    public getImages(disk:DiskType) :Observable<string[]> {
      return this.http.post(environment.apiURL + '/disk/images/all', {disk:disk}).pipe(map((res:string[]) => res));
    }  
    



    /**Uploads image to the specific disk */
    public uploadImage(disk:DiskType,data:FormData) {
      const nginxTrackId = this.getIdNginxTracking();
      console.log("nginxTrackId:", nginxTrackId);
      let nginxInterval  = null;
      return this.http.post(environment.apiURL + '/disk/images/upload/'+disk + "?X-Progress-ID="+nginxTrackId, data, {
        reportProgress: true,
        observe: 'events'
      }).pipe(map((event) => {
        let progress=0;
        switch (event.type) {
          case HttpEventType.Sent: {
            nginxInterval = this.startNginxTracking(nginxTrackId)
            return { status: 'start', message: progress };           
          }
          case HttpEventType.UploadProgress: 
            console.log("Recived UploadProgress:", event)  
            progress = Math.round(100 * event.loaded / event.total);
            this._progress.next(progress);
            return { status: 'progress', message: progress };           
          case HttpEventType.Response:
             setTimeout(() => this._progress.next(0),200);
             this.stopNginxTracking(nginxTrackId, nginxInterval);
            return { status: 'completed', message:event.body};
          default:
            return {status: 'unhandled',message:event.type};
        }
      })
      );
    }    

    /**Gets key for progress tracking */
    private getIdNginxTracking() {
        return Math.random().toString(36).replace(/[^a-z]+/g, '');
    }

    /**Starts progress tracking for nginx */
    private startNginxTracking(nginxId:string) {
      let interval = null;
      if (environment.type=="vps") {
        interval =  setInterval(() => {
          let subscription =  this.http.get(environment.mainExtURL + '/progress'+ "?X-Progress-ID="+nginxId,{responseType: 'text'}).subscribe(res => {
                res = res.replace("(","");
                res = res.replace(")","");
                res = res.replace(";","");
                try {
                  let result = JSON.parse(res);
                  console.log("nginx result:", result);
                  switch (result.state) {
                    case  "uploading": 
                      this._progress.next(Math.round(100 * result.received / result.size));
                      break;
                    case "error": 
                        console.log("Error un nginx upload progress:",result.status);
                        clearInterval(interval);
                        break;               
                    case "done": 
                      clearInterval(interval);
                      setTimeout(() => this._progress.next(0),200);
                      break;
                    
                  }
                } catch(error) {
                  if (interval) clearInterval(interval);
                };
                //'state' : 'uploading', 'received' : <size_received>, 'size' : <total_size>
                subscription.unsubscribe();
            })
        },1000);
      }
      return interval;
    }

    /**Stops progress tracking for nginx */
    private stopNginxTracking(nginxId:string,interval:any) {
      if (environment.type=="vps") {
        if (interval != null)
          this._progress.next(null);
          clearInterval(interval);
      }
    }
    /**Returns observable of progress */
    getUploadProgress() {
      return this._progress;
    }
}
