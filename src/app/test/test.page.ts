import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController } from "@ionic/angular";

@Component({
    selector: 'app-test',
    templateUrl: './test.page.html',
    styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

    constructor(private modalController: ModalController, private alertCtrl: AlertController) { }

    ngOnInit() {}

    async presentAlert() {
        let alert = await this.alertCtrl.create({
            header: 'Low battery',
            subHeader: '10% of battery remaining',
            buttons: ['Dismiss']
        });
        alert.present();
    }

    async presentConfirm() {
        let alert = await this.alertCtrl.create({
            header: 'Confirm purchase',
            message: 'Do you want to buy this book?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Buy',
                    handler: () => {
                        console.log('Buy clicked');
                    }
                }
            ]
        });
        alert.present();
    }

    async presentPrompt() {
        let alert1 = await this.alertCtrl.create({
            header: 'Login',
            inputs: [
                {
                    name: 'username',
                    placeholder: 'Username'
                },
                {
                    name: 'password',
                    placeholder: 'Password',
                    type: 'password'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Login',
                    handler: data => {
                        // if (User.isValid(data.username, data.password)) {
                        //     // logged in!
                        // } else {
                        //     // invalid login
                        //     return false;
                        // }
                        alert("Hello")
                    }
                }
            ]
        });
        alert1.present();
    }
}
