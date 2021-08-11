import { Injectable } from '@angular/core';
import {DemandeModel} from "../model/demande.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {AuthentificationService} from "./authentification.service";
import {catchError, finalize} from "rxjs/operators";
import {Payeur} from "../model/payeur.model";

@Injectable({
    providedIn: 'root'
})
export class DemandeService {
    api = environment.apiiTest;

    // constheaders= newHttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
    // returnthis.http.post(this.host+'ConnectUserByCredential',data,{ 'headers':headers });

    constructor(private http: HttpClient, private authService: AuthentificationService) { }

//     host = 'http://http://10.3.20.63:2021';
    host = environment.apiDemande
    host1 = 'http://localhost:2021';

    sendFile(document){
        let headers = new HttpHeaders({'Content-Type': undefined});
        const formData = new FormData();
        formData.append('document', document)
        return this.http.post(this.host + '/demandevehicule/upload1', formData, {headers: headers});
    }

    createDemande(data: DemandeModel): Observable<DemandeModel>{
        // let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
        // const formData = new FormData();
        // Object.keys(data).map((key) =>{
        //     formData.append(key, data[key])
        // });
        return this.http.post<DemandeModel>(this.host + '/demandevehicule/create1', data);
    }

    postRessource(url, data){
        const formData = new FormData();
        Object.keys(data).map((key) =>{
            formData.append(key, data[key])
        });
        data = formData;
        return this.http.post(url, data);
    }

    saveDemande(demande: DemandeModel){
        // this.demande.push(demande);
        return this.http.post(this.host + '/demandes', demande);
    }

    getAllDemandes(owner): any{
        // return this.demande.forEach(dem => {});
        // return this.http.get(this.api + 'demandevehicule/1');
        return this.http.get(this.host + '/demandevehicule/list/' + owner);
    }

    getUser(){
        return this.http.get(this.host + '/users');
    }

    getRessource(url){
        return this.http.get(url);
    }

    deleteRessource(url){
        return this.http.delete(url);
    }

    getDemande(id: number): Observable<any>{
        return this.http.get<any>(this.host + '/demandevehicule/' +id);
    }

    deleteDemande(demande){
        return this.http.post(this.host + '/demandevehicule/delete', demande);
    }

    putRessource(url, data){
        return this.http.put(url, data);
    }

    patchRessource(url, data){
        return this.http.patch(url, data);
    }

    postData(formData: FormData){
        alert('Success...!');
        return this.http.post(this.host + "/demandevehicule/upload", formData);
    }

    save(url){
        // this.demande.push(demande);
        return this.http.get(this.host + '/demandevehicule/save/'+ url);
    }

    payer(data): Observable<Payeur>{
        return this.http.post<Payeur>(this.host + "/moyenPaiement/crypter", data);
    }

    getTotalDemande(owner){
        return this.http.get(this.host + '/demandevehicule/totalencoursdemandeur/' + owner);
    }

    getEnCoursDemande(owner){
        return this.http.get(this.host + '/demandevehicule/totalencoursvalidationdemandeur/' + owner);
    }

    getValideesDemande(owner){
        return this.http.get(this.host + '/demandevehicule/totalvaliderdemandeur/' + owner);
    }

    getRejetDemande(owner){
        return this.http.get(this.host + '/demandevehicule/totalrejetdemandeur/' + owner);
    }

}
