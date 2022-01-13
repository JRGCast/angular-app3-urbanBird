import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HTUOrWIResponse } from 'src/app/shared/Offer.model';
import { FetchServices } from 'src/services/fetchInAPI.service';

@Component({
  selector: 'urbanBird-how-to-use',
  templateUrl: './how-to-use.component.html',
  styleUrls: ['./how-to-use.component.scss'],
  providers: [FetchServices]
})
export class HowToUseComponent implements OnInit {

  currOfferId!: number
  currOfferHTUInfo!: HTUOrWIResponse | undefined

  constructor(
    private theRoute: ActivatedRoute,
    private theFetchService: FetchServices
  ) { }


  ngOnInit(): void {
    this.currOfferId = this.theRoute.snapshot.parent?.params['id']
    this.theFetchService.getCurrHTUorWI(this.currOfferId, 'howtouse')
      .then((info: HTUOrWIResponse | undefined) => this.currOfferHTUInfo = info)
  }
}
