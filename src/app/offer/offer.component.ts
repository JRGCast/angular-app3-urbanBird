import { Component, OnInit } from '@angular/core';
import { FetchServices } from 'src/services/fetchInAPI.service';
import { ActivatedRoute } from '@angular/router';
import { Offer } from '../shared/Offer.model';
import { Observable, interval, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'urbanBird-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
  providers: [FetchServices]
})
export class OfferComponent implements OnInit {

  public currOffer!: Offer
  public showHowToUse: boolean = true
  // por quê currOffer diretamente no constructor dá pala?
  constructor(
    // public currOffer!: Offer // aqui dá pala
    private theRoute: ActivatedRoute,
    private theOfficeService: FetchServices,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      const currId = this.theRoute.snapshot.params['id']
      this.theOfficeService.offerById(currId).then((theCurrOffer: any) => {
        this.currOffer = theCurrOffer;
      })
      console.log(this.currOffer)
    }, 1000)
  }
}
