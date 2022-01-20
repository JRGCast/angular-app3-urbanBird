import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; // sobre o Validators => https://angular.io/api/forms/Validators
// Por fim, vamos ao modelo mais atual, utilizar o ReactiveForms. A diferença deste para o templateForms é que aqui, quem 'cuidava' da validação era o template, já no Reactive, quem cuida é a classe do componente, o que dá muito mais segurança que o:
// import { NgForm } from '@angular/forms';

import { BuyOrderService } from 'src/services/buyOrderService.service';
import { FetchServices } from 'src/services/fetchInAPI.service';
import { Order } from '../shared/Order.model';

@Component({
  selector: 'urbanBird-buy-order',
  templateUrl: './buy-order.component.html',
  styleUrls: ['./buy-order.component.scss'],
  providers: [FetchServices, BuyOrderService]
})
export class BuyOrderComponent implements OnInit {
  // public address: string = ''
  // public addressNumber!: number
  // public addressComplement: string = ''
  // public payMethod!: string
  public orderDoneId!: number

  // @ViewChild('buyForm') public theForm!: NgForm // veja que aqui é recuperado o valor do formulário lá do template, sem a necessidade de invocar um método na classe, o que já diminui ainda mais nosso código

  /*Campos importantes do objetão NgForm:
  pristine/dirty: pristine é quando o campo ainda é 'virgem', dirty é quando é repassado algum valor;
  untouched/touched: quando o usuário ainda não focou no campo, ele é untouched, se clicou/focou, torna-se touched;
  valid/invalid: quando aquele campo preenche a validação ou não, de acordo com o preenchimento de campos 'required',
  vale ressaltar que as regras de, por exemplo, minLength/maxLength se aplicam em conjunto;
  ** é possível atribuir no template tais atributos, colocando ng a frente (ex.: ngTouched, ngValid) e o Angular aplica classes automaticamente, de acordo com os respectivos atributos (ex.: class="ng-untouched ng-pristine ng-invalid")
  */

  // e a primeira coisa a se fazer no ReactiveForms, é entender que será criado um controlador de formulário, assim, uma tag <form> no template, sem nenhuma diretiva, gerará um erro, bem como necessário ter uma referência ao formGroup, bem como definir algumas instâncias, de acordo com os campos a serem validados, para conectar com o formulário do template
  public theReactiveFormGroup: FormGroup = new FormGroup({
    /*
    cada instância controladora deve ser um FormControl. O FormControl possui 3 parâmetros:
    valor inicial do campo, validador ou array de validadores, validador ou array de validadores assíncronos.
    Por serem métodos estáticos, não é necessário instanciar a classe para utilizá-lis
    */
    "address": new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(120)]),
    "addressNumber": new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    "addressComplement": new FormControl(null),
    "payMethod": new FormControl(null, Validators.required),
  })

  // form validation com data biding
  // public addressValid: boolean = false
  // public addressNumberValid: boolean = false
  // public addressComplementValid: boolean = false
  // public payMethodValid: boolean = false
  // public confirmButtonDisabled: boolean = true

  constructor(public buyOrderService: BuyOrderService) { }

  ngOnInit(): void {
  }

  // updateAddress(updateWhat: string, inputtedAddress: string): void {
  //   switch (updateWhat) {
  //     case 'addressNumber':
  //       this.addressNumber = Number(inputtedAddress)
  //       this.verifyValid()
  //       break;
  //     case 'addressComplement':
  //       this.addressComplement = inputtedAddress
  //       this.verifyValid()
  //       break;
  //     default:
  //       this.address = inputtedAddress
  //       this.verifyValid()
  //       break;
  //   }
  // }

  // updatePaymentMethod(selectedMethod: string): void {
  //   this.payMethod = selectedMethod
  //   this.verifyValid()
  // }

  // verifyValid(): void {
  //   this.address.length > 5 ? this.addressValid = true : this.addressValid = false;
  //   Number(this.addressNumber) ? this.addressNumberValid = true : this.addressNumberValid = false;
  //   this.addressComplement ? this.addressComplementValid = true : this.addressComplementValid = false;
  //   this.payMethod ? this.payMethodValid = true : this.payMethodValid = false;

  //   if (this.addressValid && this.addressNumberValid && this.addressComplementValid && this.payMethodValid) {
  //     this.confirmButtonDisabled = false
  //   } else {
  //     this.confirmButtonDisabled = true
  //   }
  // }

  // templateFormConfirmation(buyForm: NgForm) {
  //   console.log(buyForm)
  //   console.log('viewChild', this.theForm.value)
  //   // veja que mostra o ngForm, com inúmeras propriedades, dentre elas o value, que contém todos os values do template, fazendo com que não seja mais necessário criar atributos na classe
  // }
  /*
  Podemos fazer a mesma Requisição HTTP utilizando apenas o templateForms, com o ngForms, daí, ao invés disto:
   orderConfirmation() {
     this.buyOrderService.confirmBuyOrder({
       address: this.address,
       addressNumber: this.addressNumber,
       addressComplement: this.addressComplement,
       paymentMethod: this.payMethod
     }).subscribe(
       {
         next: (orderId: number) => { console.log(orderId); this.orderDoneId = orderId },
         error: err => console.log(err)
       }
     )
   }
   teremos isto:
   */
  // orderConfirmationTemplateForms():void {
  //   let { address, addressNumber, addressComplement, payMethod } = this.theForm.value
  //   let theTemplateOrder = new Order(
  //     address, addressNumber, addressComplement, payMethod
  //   )
  //   this.buyOrderService.confirmBuyOrder(theTemplateOrder).subscribe(
  //     {
  //       next: (orderId: number) => { console.log(orderId); this.orderDoneId = orderId },
  //       error: err => console.log(err)
  //     }
  //   )
  // }

  orderConfirmationReactiveForms(): void {
    console.log(this.theReactiveFormGroup) // veja a semelhança com o templateForms
    if (this.theReactiveFormGroup.status === 'INVALID') {
      this.theReactiveFormGroup.markAllAsTouched() // apenas para dar o feedback visual caso a pessoa clique no botão de confirmação porventura destravado
    } else {
      let { value: { address, addressNumber, addressComplement, payMethod } } = this.theReactiveFormGroup
      let theReactiveFormOrder: Order = new Order(
        address,
        addressNumber,
        addressComplement,
        payMethod
      )
      this.buyOrderService.confirmBuyOrder(theReactiveFormOrder).subscribe(
        {
          next: (orderId: number) => { console.log(orderId); this.orderDoneId = orderId },
          error: err => console.log(err)
        }
      )
    }
  }
}
