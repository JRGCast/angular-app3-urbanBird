import { CartItem } from "./CartItem.model";

export class Order {
  constructor(
    public address: string,
    public addressNumber: number,
    public addressComplement: string,
    public paymentMethod: string,
    public cartItemsOrder: Array<CartItem>
  ) { }
}