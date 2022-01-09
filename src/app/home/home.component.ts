import { Component, OnInit, OnChanges } from '@angular/core';
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

  constructor(private theOfferService: OfferServices) { }

  ngOnInit(): void {
    this.theOfferService.fetchAllThoseOffers().then(response => this.everyOffer = response)
  }
}
