import { Routes } from "@angular/router";
import { FunComponent } from "../fun/fun.component";
import { HomeComponent } from "../home/home.component";
import { JustTestComponent } from "../just-test/just-test.component";
import { HowToUseComponent } from "../offer/how-to-use/how-to-use.component";
import { OfferComponent } from "../offer/offer.component";
import { WhereIsItComponent } from "../offer/where-is-it/where-is-it.component";
import { RestaurantsComponent } from "../restaurants/restaurants.component";

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'restaurants', component: RestaurantsComponent },
  { path: 'fun', component: FunComponent },
  { path: 'oferta', component: HomeComponent },
  { path: 'just-test', component: JustTestComponent },
  {
    path: 'oferta/:id', component: OfferComponent,
    children: [
      { path: '', component: HowToUseComponent },
      { path: 'como-usar', component: HowToUseComponent },
      { path: 'onde-fica', component: WhereIsItComponent }
    ]
  },
]