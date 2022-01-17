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
    const currIdSnapShot = this.theRoute.snapshot.parent?.params['id'] // aqui o mesmo problema do snapshot do componente pai
    this.theRoute.parent?.params.subscribe((parameters: any) => {
      this.currOfferId = parameters.id;
      console.log(`currIdSnapshot where is it: ${ currIdSnapShot }, ''subscribe: ${ this.currOfferId }`)
      this.theFetchService.getCurrHTUorWI(this.currOfferId, 'whereisit')
        .then((theResponse: HTUOrWIResponse | undefined) => {
          this.currOfferWIInfo = theResponse
        })
    })
  }
}
