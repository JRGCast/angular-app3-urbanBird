import { Component, OnInit } from '@angular/core';
import { FetchServices } from 'src/services/fetchInAPI.service';
import { ActivatedRoute } from '@angular/router';
import { Offer } from '../shared/Offer.model';
import { Observable, interval, Observer, Subscription } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { CartService } from 'src/services/cartService.service';
import { CartItem } from '../shared/CartItem.model';

@Component({
  selector: 'urbanBird-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
  providers: [FetchServices, /*CartService*/] // não mais provido aqui, já que está provido na instância do app.module
})
export class OfferComponent implements OnInit {

  public currOffer!: Offer
  public showHowToUse: boolean = true
  // por quê currOffer diretamente no constructor dá pala?
  constructor(
    // public currOffer!: Offer // aqui dá pala
    private theRoute: ActivatedRoute,
    private theOfficeService: FetchServices,
    private theCartService: CartService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      const currIdSnap = this.theRoute.snapshot.params['id'] // infelizmente isso aqui só recupera o atributo na primeira vez que essa rota é acessada na primeira vez, se a mesma rota for atualizada sem sair do componente, ele não pegará o valor atualizado.
      // Para resolver isso, podemos utilizar o observable, e podemos misturar observable e promises (não esqueça de atualizar nos componentes filhos que dependam da rota do pai):
      this.theRoute.params.subscribe((parameters: any) => {
        const theCurrId = parameters.id
        this.theOfficeService.offerById(theCurrId).then((theCurrOffer: any) => {
          this.currOffer = theCurrOffer;
          console.log(`params snapshot: ${ currIdSnap }, params.subscribe.id: ${ theCurrId }`)
        })
      })
    }, 1000)
  }

  addItemToCart(): void {
    const { id, titulo, descricao_oferta, valor, imagens } = this.currOffer
    const theItemToAdd: CartItem = {
      id,
      title: titulo,
      image: imagens[0].url,
      offerDescription: descricao_oferta,
      price: valor,
      quantity: 1
    }

    this.theCartService.addItemToCart(theItemToAdd)
    this.theCartService.showCartItems()
  }
}
