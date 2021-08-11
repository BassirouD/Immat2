import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  phase: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onSuivant(){
    this.phase = true;
  }

}
