import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }
  window :any;
  isAuthenticated: boolean = false;
  roles: any;
  username: any;
  accessToken!: any;


  public login(username: string, password: string) {
    let body = new HttpParams()
      .set("username", username)
      .set("password", password)
      .set("grant_type", "password");

    let options = {
      headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded"),
    };

    return this.http.post("http://localhost:8083/auth/Login", body.toString(), options);
  }


 loadProfile(data: any) {
   this.isAuthenticated=true;
   this.accessToken =data['access-token'];
   let decodedJwt:any = jwtDecode(this.accessToken);
   //extract the role and userbame from Jwt
   this.roles=decodedJwt.scope
   this.username=decodedJwt.sub;
   //store Jwt in Local Storage
   window.localStorage.setItem("jwt-token",this.accessToken);
 }

 loadTokenFromStorage() {
   let token = window.localStorage.getItem("jwt-token");
   if(token){
     this.loadProfile({"access-token":token});
   //une fois on charge le token on va aller a cette route bch ila khraj yrjaa nichn l page
     //d accueil si mknch deconnecta o token baqi matexpirach
     //this.router.navigateByUrl("/admin/");
   }
 }

  public Logout() {
    this.isAuthenticated=false;
    this.accessToken=undefined;
    this.username=undefined;
    this.roles=undefined;
    this.router.navigateByUrl("/login");
    localStorage.removeItem("jwt-token");


  }
}
