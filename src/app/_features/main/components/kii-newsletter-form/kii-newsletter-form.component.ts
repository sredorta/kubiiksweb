import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { KiiFormRestoreService } from '../../services/kii-form-restore.service';
import { KiiApiNewsletterService, INewsletter } from '../../services/kii-api-newsletter.service';

@Component({
  selector: 'kii-newsletter-form',
  templateUrl: './kii-newsletter-form.component.html',
  styleUrls: ['./kii-newsletter-form.component.scss']
})
export class KiiNewsletterFormComponent implements OnInit {
  @Output() onKiiSubmit = new EventEmitter<INewsletter>();

  @ViewChild('firstName',{static:false}) first : ElementRef;
  @ViewChild('lastName',{static:false}) last : ElementRef;
  @ViewChild('email',{static:false}) email : ElementRef;


  constructor( private kiiForm : KiiFormRestoreService, private r: Renderer2) { }

  ngOnInit() {
    const restored = this.kiiForm.restore("newsletter");
    if (restored) {
      if (restored['firstName']) this.first.nativeElement.value = restored['firstName'];
      if (restored['lastName']) this.first.nativeElement.value = restored['lastName'];
      if (restored['email']) this.first.nativeElement.value = restored['email'];
    }
  }

  onSubmit() {
    let hasError = false;
    //Do the validations
    if (this.validateName(this.first.nativeElement.value)) {
      this.r.addClass(this.first.nativeElement, 'has-error');
      hasError = true;
    } else       
      this.r.removeClass(this.first.nativeElement, 'has-error');

    if (this.validateName(this.last.nativeElement.value)) {
      this.r.addClass(this.last.nativeElement, 'has-error');
      hasError = true;
    } else       
      this.r.removeClass(this.last.nativeElement, 'has-error');
    if (this.validateEmail(this.email.nativeElement.value)) {
      this.r.addClass(this.email.nativeElement, 'has-error');
      hasError=true;
    } else       
      this.r.removeClass(this.email.nativeElement, 'has-error');
    //Submit the form
    if (!hasError)
      this.onKiiSubmit.emit({firstName:this.first.nativeElement.value, lastName:this.last.nativeElement.value, email:this.email.nativeElement.value});

  }

  private validateEmail(email:string) {
      var re = /\S+@\S+\.\S+/;
      return !re.test(email);
  }
  private validateName(name:string) {
    return name.length<1?true:false;
  }

  saveForm() {
     this.kiiForm.store('newsletter',{firstName:this.first.nativeElement.value, lastName:this.last.nativeElement.value, email:this.email.nativeElement.value});
  }
}
