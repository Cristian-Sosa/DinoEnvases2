import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.sass']
})
export class AuthPage {
  
  authForm = new FormGroup({
    userControl: new FormControl(null, [
      Validators.required,
      Validators.nullValidator,
    ]),
    passControl: new FormControl(null, [
      Validators.required,
      Validators.nullValidator,
    ])
  })


  submitForm = () => {
    console.log(this.authForm.get('userControl')?.invalid);
  }
}
