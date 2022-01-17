import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'urbanBird-order-buy-success',
  templateUrl: './order-buy-success.component.html',
  styleUrls: ['./order-buy-success.component.scss']
})
export class OrderBuySuccessComponent implements OnInit {
  @Input('orderIdExists') /*Não é necessário referenciar o atributo da classe pai que está vindo do input, mas é uma boa prática*/ public orderIdExists!: number

  constructor() { }

  ngOnInit(): void {
  }

}
