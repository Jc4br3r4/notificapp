import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  log_form:FormGroup = this.fb.group({
    numberCard: ['',[Validators.pattern(/^[0-9]+$/),Validators.max(16),Validators.min(16)]],
    password: [{value:'', disabled:true},Validators.pattern(/^[0-9]+$/)]
  });
  

  arrayNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
  pass = ""
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.arrayNumber.sort(()=>{
      return Math.random() - 0.5
    })
    console.log('hola', this.arrayNumber)
  }

  obtenernumero(item) {
    console.log('El valor es', item)
    if(this.pass.length < 6){
      this.pass = this.pass + item;
      this.log_form.controls['password'].setValue(this.pass)
      console.log("Contra: ",this.log_form.controls['password'].value)
    } else {
      console.log("Excediste")
    }
  }
  clearPass(x:number) {
    if (x == 1) {
      if (this.pass.length!= 0) {
        this.pass = this.pass.slice(0, -1)
        this.log_form.controls['password'].setValue(this.pass)
      } else {
        console.log("VACIO PAPU")
      }
    }
    if (x == 2) {
      this.log_form.controls['password'].setValue('')
      this.pass=''
    }
  }
  onlynumber($event) {
    return $event.charCode >= 48 && $event.charCode <= 57
  }
  
}
