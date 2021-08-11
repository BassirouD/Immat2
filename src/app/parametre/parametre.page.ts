import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.page.html',
  styleUrls: ['./parametre.page.scss'],
})
export class ParametrePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  catSlideOpts = {
    slidesPerView:0.7,
    spaceBetween: 10,
    slidesOffsetBefore: 11,
    freeMode: true
  };

}
