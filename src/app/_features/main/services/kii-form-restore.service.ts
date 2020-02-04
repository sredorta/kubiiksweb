//Simple service that stores the current data of a form so that it is restored when we navigate back

import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class KiiFormRestoreService {

  /**contains the initial data of the form */
  private data: any = {};  

  constructor() { 
  }
  /**Store current form values */
  store(formName:string, formData:any) {
    this.data[formName] = formData;
  }

  /**Restore current form values */
  restore(formName:string) {
    return this.data[formName]?this.data[formName]:null;
  }


}