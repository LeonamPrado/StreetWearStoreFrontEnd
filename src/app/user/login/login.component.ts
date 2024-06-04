import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;

  constructor( private userService: UserService, private router: Router){}

  ngOnInit(){
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    })
  }

  handleLogin(){
    this.userService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe(response =>{
      this.userService.isLoggedIn.next(response)
      if(!response){
        alert("Email or Password wrong")
      }else{
        this.router.navigate(['/'])
      }
    })
  }
}
