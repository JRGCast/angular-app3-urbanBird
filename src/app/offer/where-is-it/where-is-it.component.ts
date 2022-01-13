import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HTUOrWIResponse } from 'src/app/shared/Offer.model';
import { FetchServices } from 'src/services/fetchInAPI.service';

@Component({
  selector: 'urbanBird-where-is-it',
  templateUrl: './where-is-it.component.html',
  styleUrls: ['./where-is-it.component.scss'],
  providers: [FetchServices]
})
export class WhereIsItComponent implements OnInit {

  currOfferId!: number
  currOfferWIInfo!: HTUOrWIResponse | undefined

  constructor(
    private theRoute: ActivatedRoute,
    private theFetchService: FetchServices
  ) { }

  ngOnInit(): void {
    this.currOfferId = this.theRoute.snapshot.parent?.params['id']
    this.theFetchService.getCurrHTUorWI(this.currOfferId, 'whereis')
      .then((info: HTUOrWIResponse | undefined) => this.currOfferWIInfo = info)
  }
}
