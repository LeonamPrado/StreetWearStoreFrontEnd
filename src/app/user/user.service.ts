import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({providedIn: 'root'})

export class UserService{
  
  constructor( private htpp: HttpClient){}

  isLoggedIn = new Subject<boolean>()
  currentUser = new BehaviorSubject<number>(0)


  login(email: String, password: String){
    const user = new User(email, password)
    return this.htpp.post<User>("http://localhost:8080/user/login", user)
  }

  register(email: String, password: String){
    const user = new User(email, password)
    return this.htpp.post<boolean>("http://localhost:8080/user", user)
  }
}