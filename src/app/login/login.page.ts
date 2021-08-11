import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DemandeService} from "../services/demande.service";
import {AuthentificationService} from "../services/authentification.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    login: FormGroup;
    user;
    hide = true;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private dmdService: DemandeService,
        private authService: AuthentificationService,
        private formbuilder:FormBuilder,
        private route:ActivatedRoute,
    ) { }

    // onLogin(data) {
    //   if (this.login.valid) {
    //     // this.dmdService.login(data)
    //     //     .subscribe(res => {
    //     //       this.user = data;
    //     //       this.router.navigateByUrl('/tabs/home');
    //     //     }, error => {
    //     //       console.log(error);
    //     //     });
    //     console.log(this.login.value);
    //     this.router.navigateByUrl('/tabs/home');
    //   }
    // }

    // onLog(data){
    //   this.authService.login(data)
    //       .subscribe(resp => {
    //         let jwt = resp.headers.get('Authorization');
    //         this.authService.saveToken(jwt);
    //         this.router.navigateByUrl('/tabs/home');
    //       }, error => {
    //         console.log(error);
    //       });
    // }

    loginForm = this.formbuilder.group({
        username:['admin',Validators.required],
        password:['Gainde2000#',Validators.required]
    })

    onLogin(){
         // this.authService.login(this.loginForm.value)
         //     .subscribe(data=>{
         //         if(data.statut){
         //             this.user=data.data;
         //             //alert("connexion réussie !!!")
         //             localStorage.setItem('id',JSON.stringify(this.user.id));
         //             localStorage.setItem('user',JSON.stringify(this.user));
         //             localStorage.setItem('token',this.user.token);
         //             localStorage.setItem('prenom',this.user.username);
         //             localStorage.setItem('nom',this.user.nom);
         //             localStorage.setItem('username',this.user.username);
         //             this.router.navigate(["/tabs/home"])
         //         }else{
         //             alert("connexion no réussie !!!")
         //         }
         //     },err=>{
         //         console.log(err);
         //     })
      this.router.navigate(["/tabs/home"])
    }

    ngOnInit() {
        // this.login = this.fb.group({
        //     email: this.fb.control('', [
        //         Validators.required,
        //     ]),
        //     password: this.fb.control('', [
        //         Validators.required,
        //         Validators.minLength(6),
        //         Validators.maxLength(150)
        //     ])
        // });
    }

}
