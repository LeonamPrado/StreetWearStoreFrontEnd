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

  constructor(private userService: UserService, private router:Router){}
  
  ngOnInit(){
    this.registerForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
      'confirmPassword': new FormControl(null, Validators.required)
    })
  }

  handleRegister(){
    if(this.registerForm.value.password !== this.registerForm.value.confirmPassword ){
      return alert("The passwords are different")
    }
    this.userService.register(this.registerForm.value.email, this.registerForm.value.password).subscribe(response =>{
      if (response){
        this.router.navigate(['/login'])
      }else{
        alert("Email already in use")
      }
    })
  }
}
