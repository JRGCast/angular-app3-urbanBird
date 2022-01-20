import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localePt from '@angular/common/locales/pt'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopComponent } from './top/top.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { FunComponent } from './fun/fun.component'
import { RouterModule } from '@angular/router';
import { ROUTES } from './routes/routes.routes';
import { OfferComponent } from './offer/offer.component';
import { WhereIsItComponent } from './offer/where-is-it/where-is-it.component';
import { HowToUseComponent } from './offer/how-to-use/how-to-use.component';
import { JustTestComponent } from './just-test/just-test.component';
import { registerLocaleData } from '@angular/common';
import { ReducedDescription } from 'src/utils/reducedDescription.pipe';
import { BuyOrderComponent } from './buy-order/buy-order.component';
import { OrderBuySuccessComponent } from './order-buy-success/order-buy-success.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

registerLocaleData(localePt) // documentação fala de acrescentar em app.module, mas ao tentar, a propriedade acrescentada fica como 'não permitida'. Isso aqui resolve (serve para que todos os números onde for chamado o pipe currency venham com o padrão Real Brasileiro, isto é, ponto no milhar e vírgula nos centavos (R$1.030,50))
@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    HomeComponent,
    FooterComponent,
    RestaurantsComponent,
    FunComponent,
    OfferComponent,
    WhereIsItComponent,
    HowToUseComponent,
    JustTestComponent,
    ReducedDescription, // vem aqui em declarations
    BuyOrderComponent,
    OrderBuySuccessComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES), // para rotas geral, forRoot, em rotas 'filhas', seria forChildren, dentro do componente pai, tal como em OfferComponent
    // FormsModule, // para template forms
    ReactiveFormsModule, // para o reactiveForms, que é a maneira mais atual de se lidar com validação de formulários
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: "BRL" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
