import { Component, OnInit } from '@angular/core';
import { OfferServices } from 'src/services/offers.service';
import { Offer } from '../shared/Offer.model';

@Component({
  selector: 'urbanBird-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [OfferServices]
})
export class HomeComponent implements OnInit {

  public everyOffer!: Array<Offer>

  constructor(private theOfferService: OfferServices) {

  }

  theFilter(bestOffers: boolean) {
    this.theOfferService.bestOffershttp(bestOffers).then((data: Array<Offer>) => this.everyOffer = data)
  }

  ngOnInit(): void {
    this.theOfferService.fetchAllThoseOffersHttp().then((data: Array<Offer>) => this.everyOffer = data)
  }

}
