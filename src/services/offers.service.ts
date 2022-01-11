import { Offer } from "src/app/shared/Offer.model"
import { HttpClient } from "@angular/common/http"
import { Injectable, OnInit } from "@angular/core"
import { firstValueFrom, lastValueFrom } from 'rxjs';




const offerEndpointUrl = 'http://localhost:3000/ofertas?'
@Injectable()
export class OfferServices implements OnInit {
  public allOffers!: Array<Offer>
  private offerUrl: string = 'http://localhost:3000/ofertas'

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.fetchAllThoseOffersHttp(offerEndpointUrl).then((theResponse: Offer[]) => this.allOffers = theResponse)
  }

  get theOffers(): Array<Offer> {
    return this.allOffers
  }

  async theFetching(endpoint: string): Promise<any> {
    try {
      const theFetch = await lastValueFrom(this.httpClient.get(endpoint, { responseType: 'json' }));
      return theFetch
    } catch (error) {
      console.error(error)
    }
  }

  // fetchAllThoseOffers(): Promise<Offer[]> {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       setTimeout(() => resolve(mockOffers), 3000)
  //     } catch (error) {
  //       console.log('Deu erro', error)
  //       reject(error)
  //     }
  //   })
  // }
  async fetchAllThoseOffersHttp(endpoint: string = offerEndpointUrl): Promise<any> {
    return this.theFetching(endpoint)
  }

  async bestOffershttp(bOffer: boolean): Promise<Offer[]> {
    const bestOffersEndpoint = `${ this.offerUrl }?destaque=${ bOffer }`
    return this.theFetching(bestOffersEndpoint)
  }

  async offerByCategory(category: string): Promise<Offer[]> {
    const currCategoryEndpoint = `${ this.offerUrl }?categoria=${ category }`
    return this.theFetching(currCategoryEndpoint)
  }

  async offerById(id: number): Promise<Offer> {
    const currIdEndpoint = `${ this.offerUrl }?id=${ id }`
    return this.theFetching(currIdEndpoint).then(oneValueInArray => oneValueInArray.shift())
  }
}