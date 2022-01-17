import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, retryWhen, tap } from "rxjs";
import { Order } from "src/app/shared/Order.model";
import { genericRetryStrategy } from "src/app/shared/retryWhenStrategy.model";

@Injectable()
export class BuyOrderService {
  private serviceUrl: string = 'http://localhost:3000'
  constructor(
    private http: HttpClient
  ) { }

  confirmBuyOrder(theOrder: Order): Observable<any> {
    const postHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
    // é possível setar diretamente como feito acima, ou com o .set (sobrescrevendo valores) ou com o .append (concatenando valores):
    // postHeaders.set ou .append(/*Chave*/'Content-Type', /*Valor*/'application/json')
    return this.http.post(
      `${ this.serviceUrl }/pedidos`,
      JSON.stringify(theOrder),
      ({ headers: postHeaders })
    ).pipe(
      tap((response: any) => console.log(response)),
      retryWhen(genericRetryStrategy()),
      map((response: any) => response.id)
    )
  }
}