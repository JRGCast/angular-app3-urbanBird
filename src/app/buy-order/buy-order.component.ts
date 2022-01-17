import { Component, OnInit } from '@angular/core';
import { BuyOrderService } from 'src/services/buyOrderService.service';
import { FetchServices } from 'src/services/fetchInAPI.service';

@Component({
  selector: 'urbanBird-buy-order',
  templateUrl: './buy-order.component.html',
  styleUrls: ['./buy-order.component.scss'],
  providers: [FetchServices, BuyOrderService]
})
export class BuyOrderComponent implements OnInit {
  public address: string = ''
  public addressNumber!: number
  public addressComplement: string = ''
  public payMethod!: string
  public orderDoneId!: number

  // form validation
  public addressValid: boolean = false
  public addressNumberValid: boolean = false
  public addressComplementValid: boolean = false
  public payMethodValid: boolean = false
  public confirmButtonDisabled: boolean = true

  constructor(public buyOrderService: BuyOrderService) { }

  ngOnInit(): void {
  }

  updateAddress(updateWhat: string, inputtedAddress: string): void {
    switch (updateWhat) {
      case 'addressNumber':
        this.addressNumber = Number(inputtedAddress)
        this.verifyValid()
        break;
      case 'addressComplement':
        this.addressComplement = inputtedAddress
        this.verifyValid()
        break;
      default:
        this.address = inputtedAddress
        this.verifyValid()
        break;
    }
    console.log(this.address, this.addressNumber, this.addressComplement)
  }

  updatePaymentMethod(selectedMethod: string): void {
    this.payMethod = selectedMethod
    this.verifyValid()
  }

  verifyValid(): void {
    this.address.length > 5 ? this.addressValid = true : this.addressValid = false;
    Number(this.addressNumber) ? this.addressNumberValid = true : this.addressNumberValid = false;
    this.addressComplement ? this.addressComplementValid = true : this.addressComplementValid = false;
    this.payMethod ? this.payMethodValid = true : this.payMethodValid = false;

    if (this.addressValid && this.addressNumberValid && this.addressComplementValid && this.payMethodValid) {
      this.confirmButtonDisabled = false
    } else {
      this.confirmButtonDisabled = true
    }
  }

  orderConfirmation() {
    this.buyOrderService.confirmBuyOrder({
      address: this.address,
      addressNumber: this.addressNumber,
      addressComplement: this.addressComplement,
      paymentMethod: this.payMethod
    }).subscribe(
      {
        next: (orderId: number) => {console.log(orderId); this.orderDoneId = orderId},
        error: err => console.log(err)
      }
    )
  }
}
