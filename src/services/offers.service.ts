import { Offer } from "src/app/shared/Offer.model"
import mockOffers from '../app/seed/offerArray.json'

export class OfferServices {
  private allOffers!: Array<Offer>

  get theOffers(): Array<Offer> {
    return this.allOffers
  }

  fetchAllThoseOffers(): Promise<Offer[]> {
    console.log('before', this.allOffers)
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => resolve(mockOffers), 3000)
      } catch (error) {
        console.log('Deu erro', error)
        reject(error)
      }
    })
  }
  constructor() {
    this.fetchAllThoseOffers()
  }
}