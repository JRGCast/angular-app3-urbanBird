export class CartItem {
  constructor(
    public id: number,
    public image: string,
    public title: string,
    public offerDescription: string,
    public price: number,
    public quantity: number
  ) { }
}