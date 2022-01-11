import { Component, OnInit } from '@angular/core';
import { OfferServices } from 'src/services/offers.service';
import { Offer } from '../shared/Offer.model';

@Component({
  selector: 'urbanBird-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
  providers: [OfferServices]
})
export class RestaurantsComponent implements OnInit {

  public restaurantOffers!: Array<Offer>

  constructor(public theOfferService: OfferServices) { }

  ngOnInit(): void {
    this.theOfferService.offerByCategory('restaurante').then((data: Array<Offer>) => {
      this.restaurantOffers = data
    })
  }
}
