import { Component, ComponentFactoryResolver, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { OfferServices } from 'src/services/offers.service';
import { ActivatedRoute } from '@angular/router';
import { Offer } from '../shared/Offer.model';

@Component({
  selector: 'urbanBird-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
  providers: [OfferServices]
})
export class OfferComponent implements OnInit {

  public currOffer!: Offer
  // por quê currOffer diretamente no constructor dá pala?
  constructor(
    // public currOffer!: Offer // aqui dá pala
    private theRoute: ActivatedRoute,
    private theOfficeService: OfferServices,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      const currId = this.theRoute.snapshot.params['id']
      this.theOfficeService.offerById(currId).then((theCurrOffer: any) => {
        this.currOffer = theCurrOffer;
        console.log(this.currOffer)
      })
      console.log(this.currOffer)
    }, 1000)
  }

}
