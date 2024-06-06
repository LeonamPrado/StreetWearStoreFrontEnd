import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  registerForm: FormGroup;
  erroMessage: string;
  registerError: boolean = false;

  constructor(private userService: UserService, private router:Router){}
  
  ngOnInit(){
    this.registerForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
      'confirmPassword': new FormControl(null, Validators.required)
    })
  }

  closeAlert(){
    this.registerError = false
  }

  handleRegister(){
    if(this.registerForm.value.password !== this.registerForm.value.confirmPassword ){
      this.erroMessage = "The passwords are different"
      this.registerError = true
      return
    }
    this.userService.register(this.registerForm.value.email, this.registerForm.value.password).subscribe(response =>{
      if (response){
        this.router.navigate(['/login'])
      }else{
        this.erroMessage = "Email already in use"
        this.registerError = true
      }
    })
  }
}
