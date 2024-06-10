import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  loginError: boolean = false
  registerForm: FormGroup;
  erroMessage: string;
  registerError: boolean = false;

  constructor( private userService: UserService, private router: Router, private location: Location){}

  ngOnInit(){
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    })
    this.registerForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
      'confirmPassword': new FormControl(null, Validators.required)
    })
  }

  closeLoginAlert(){
    this.loginError = false
    this.loginForm.reset()
  }
  closeRegisterAlert(){
    this.registerError = false
  }

  handleLogin(){
    this.userService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe(response =>{
      if (response !== null){
        this.userService.isLoggedIn.next(true)
        this.userService.currentUser.next(response.id)
      }
      if(response === null){
        this.loginError = true
      }else{
        this.location.back();
      }
    })
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
