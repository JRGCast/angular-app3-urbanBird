import { Component, OnInit } from '@angular/core';
import { FetchServices } from 'src/services/fetchInAPI.service';
import { Offer } from '../shared/Offer.model';

@Component({
  selector: 'urbanBird-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
  providers: [FetchServices]
})
export class RestaurantsComponent implements OnInit {

  public restaurantOffers!: Array<Offer>

  constructor(public theOfferService: FetchServices) { }

  ngOnInit(): void {
    this.theOfferService.offerByCategory('restaurante').then((data: Array<Offer>) => {
      this.restaurantOffers = data
    })
  }
}
