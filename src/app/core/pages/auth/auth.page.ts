import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISelect } from 'src/app/shared/models';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.sass']
})
export class AuthPage {
  public selectContent: ISelect = {
    name: 'sucursalName',
    options: [
      {value: 'AV', description: 'Alto Verde'},
      {value: 'R20', description: 'Ruta 20'},
      {value: 'SV', description: 'San Vicente'},
      {value: 'SAL', description: 'Salsipuedes'},
    ]
  }
  
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
