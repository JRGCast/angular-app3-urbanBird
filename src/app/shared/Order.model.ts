export class Order {
  constructor(
    public address: string,
    public addressNumber: number,
    public addressComplement: string,
    public paymentMethod: string
  ) { }
}