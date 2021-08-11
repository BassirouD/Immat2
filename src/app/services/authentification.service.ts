import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthentificationService {

//     host: 'http://localhost:8080';
    hostImmat = environment.apiiTest;
    jwt;
    username;
    roles: Array<String>;

    constructor(private http: HttpClient) { }

    login(data): Observable<any>{
        // return this.http.post(this.host + '/login', data, {observe: 'response'});
        return this.http.post(this.hostImmat + 'auth', data);
    }

    saveToken(jwt){
        localStorage.setItem('token', jwt);
        this.jwt = jwt;
        this.parseJWT();
    }

    parseJWT(){
        let jwtHelper = new JwtHelperService();
        let objJWT = jwtHelper.decodeToken(this.jwt);
        this.username = objJWT.obj;
        this.roles = objJWT.roles;
    }

    loadToken(){
        this.jwt = localStorage.getItem('token');
        this.parseJWT();
    }

    logOut(){
        localStorage.removeItem('token');
        this.initParams();
    }

    initParams(){
        this.jwt = undefined;
        this.username = undefined;
        this.roles = undefined;
    }
}
