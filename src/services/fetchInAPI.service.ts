import { HTUOrWIResponse, Offer } from "src/app/shared/Offer.model"
import { HttpClient, HttpResponse } from "@angular/common/http"
import { Injectable, OnInit } from "@angular/core"
import { lastValueFrom, Observable, map, retry, retryWhen } from 'rxjs';
import { genericRetryStrategy } from "src/app/shared/retryWhenStrategy.model";
import { environment } from "src/environments/environment";

@Injectable()
export class FetchServices implements OnInit {
  public allOffers!: Array<Offer>
  private offerUrl: string = `${environment.apiURL}/ofertas`
  private howToUseUrl: string = `${environment.apiURL}/como-usar`
  private whereIsUrl: string = `${environment.apiURL}/onde-fica`

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.fetchAllThoseOffersHttp(this.offerUrl).then((theResponse: Offer[]) => this.allOffers = theResponse)
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
  async fetchAllThoseOffersHttp(endpoint: string = this.offerUrl): Promise<any> {
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

  async getCurrHTUorWI(id: number, howUseOrWhereIs: string): Promise<HTUOrWIResponse | undefined> {
    const currInfoUrl = howUseOrWhereIs === 'howtouse' ? this.howToUseUrl : this.whereIsUrl
    const fetchInfo = this.theFetching(`${ currInfoUrl }?id=${ id }`)
      .then((currInfo: Array<HTUOrWIResponse>) => currInfo.shift())
    return fetchInfo
  }

  getOfferFromSearchBar(searchInput: string): Observable<Offer[]> {
    // aqui utilizar-se-á o observable, portanto, não sendo possível usar o método theFetching (ou, mais tarde, refatorá-lo para observable)
    const currSearchUrl = `${ this.offerUrl }?descricao_oferta_like=${ searchInput }`
    const observableService = this.httpClient.get(currSearchUrl, { responseType: 'json' })
      .pipe(retryWhen(genericRetryStrategy()),
        map((response: Offer[] | any) => { console.log(response); return response }))
    return observableService
  }
}