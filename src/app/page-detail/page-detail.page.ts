import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {DemandeService} from "../services/demande.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-page-detail',
    templateUrl: './page-detail.page.html',
    styleUrls: ['./page-detail.page.scss'],
})
export class PageDetailPage implements OnInit {

    @Input() id: string;
    @Input() nom: string;
    @Input() marque: string;
    @Input() puissance: string;

    // passedId = null;
    demandeId: number;
    demandeFormGroup: FormGroup;

    constructor(private modalCtrl: ModalController,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private formBuilder: FormBuilder,
                private demandeService: DemandeService,)
    {
        this.demandeId = activatedRoute.snapshot.params.id;
    }

    ngOnInit(): void {
        this.demandeService.getDemande(this.demandeId)
            .subscribe(demande => {
                this.demandeFormGroup = this.formBuilder.group({
                    id: [demande.data.id],
                    marque: [demande['data'].marque],
                    nom: [demande['data'].nom],
                    puissance: [demande['data'].puissance],
                    typeusage: [demande['data'].typeusage],
                });
            });
        // console.log(this.demandeFormGroup.value)
        // this.passedId = this.activatedRoute.snapshot.paramMap.get('id');
    }

    dismissModal(){
        this.router.navigateByUrl('/tabs/home');
    }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.ngOnInit();
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
