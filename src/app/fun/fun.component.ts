import { Component, OnInit } from '@angular/core';
import { OfferServices } from 'src/services/offers.service';
import { Offer } from '../shared/Offer.model';

@Component({
  selector: 'urbanBird-fun',
  templateUrl: './fun.component.html',
  styleUrls: ['./fun.component.scss'],
  providers: [OfferServices]
})
export class FunComponent implements OnInit {
  public funOffers!: Array<Offer>

  constructor(public theOfferService: OfferServices) { }

  ngOnInit(): void {
    this.theOfferService.offerByCategory('diversao').then((data: Array<Offer>) => {
      this.funOffers = data
    })
  }
}
