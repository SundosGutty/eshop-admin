import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'admin-form-base-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.scss']
})
export class AdminFormBaseTemplateComponent {
  @Input() formGroup!: FormGroup;
  @Input() formFields: any[] = [];
  @Input()  imageDisplay: string | ArrayBuffer;


  @Output() uploadImage = new EventEmitter()

  ngOnInit(){
   
  }
  
  
  onToggle(event:any){

  }

  getControlError(controlName: string): string {
    const control = this.formGroup.get(controlName);
    if (control?.errors) {
      if (control.errors['required']) {
        return 'This field is required';
      } else if (control.errors['email']) {
        return 'Please enter a valid email address';
      }
    }
    return '';
  }
  
  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result as string; // Cast the result as a string
        this.uploadImage.emit(event)
      };
      fileReader.readAsDataURL(file);
    }
  }

}