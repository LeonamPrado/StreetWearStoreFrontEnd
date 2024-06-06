import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  loginError: boolean = false

  constructor( private userService: UserService, private router: Router){}

  ngOnInit(){
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    })
  }

  closeAlert(){
    this.loginError = false
    this.loginForm.reset()
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
        this.router.navigate(['/'])
      }
    })
  }
}
