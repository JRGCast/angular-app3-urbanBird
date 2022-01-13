import { Component, OnInit } from '@angular/core';
import { FetchServices } from 'src/services/fetchInAPI.service';
import { Offer } from '../shared/Offer.model';

@Component({
  selector: 'urbanBird-fun',
  templateUrl: './fun.component.html',
  styleUrls: ['./fun.component.scss'],
  providers: [FetchServices]
})
export class FunComponent implements OnInit {
  public funOffers!: Array<Offer>

  constructor(public theOfferService: FetchServices) { }

  ngOnInit(): void {
    this.theOfferService.offerByCategory('diversao').then((data: Array<Offer>) => {
      this.funOffers = data
    })
  }
}
