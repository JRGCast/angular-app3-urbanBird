import { Component, OnInit } from '@angular/core';
import { FetchServices } from 'src/services/fetchInAPI.service';
import { Offer } from '../shared/Offer.model';

@Component({
  selector: 'urbanBird-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [FetchServices]
})
export class HomeComponent implements OnInit {

  public everyOffer!: Array<Offer>

  constructor(private theOfferService: FetchServices) {

  }

  theFilter(bestOffers: boolean) {
    this.theOfferService.bestOffershttp(bestOffers).then((data: Array<Offer>) => this.everyOffer = data)
  }

  ngOnInit(): void {
    this.theOfferService.fetchAllThoseOffersHttp().then((data: Array<Offer>) => this.everyOffer = data)
  }

}
