
export class User{

  public email : String
  public password : String
  public id? : number

  constructor(email: String, password: String, id?: number){
    this.email = email
    this.password = password
    this.id = id
  }
}