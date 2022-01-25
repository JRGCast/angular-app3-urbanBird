import { CartItem } from "src/app/shared/CartItem.model";


export class CartService {
  public itemsInCart: Array<CartItem> = []
  constructor() { }

  public showCartItems(): Array<CartItem> {
    return this.itemsInCart
  }

  public addItemToCart(item: CartItem): void {
    let foundItem = this.itemsInCart.find(eachItem => eachItem.id === item.id)
    if (foundItem) {
      foundItem.quantity += 1
    } else {
      this.itemsInCart = [...this.itemsInCart, item]
    }
  }

  increaseCartItemQty(item: CartItem) {
    const theCurrItem = this.itemsInCart.find(cartItem => cartItem.id === item.id)
    if (theCurrItem) {
      theCurrItem.quantity += 1
    } console.log(this.itemsInCart)
  }

  decreaseCartItemQty(item: CartItem): void {
    const theCurrItem = this.itemsInCart.find(cartItem => cartItem.id === item.id)
    if (theCurrItem) {
      theCurrItem.quantity > 1 ? theCurrItem.quantity -= 1 : this.itemsInCart.splice(this.itemsInCart.indexOf(theCurrItem, 1))
      // por algum motivo isso não funciona => this.itemsInCart = this.itemsInCart.filter(cartItem => cartItem.id !== item.id)
    }
    console.log(this.itemsInCart)
  }

  sumTotalPrice(): number {
    const totalPrice: number = this.itemsInCart.reduce((acc, currItem) => {
      return acc += (currItem.quantity * currItem.price)
    }, 0)
    return totalPrice
  }

  cleanCart(): void {
    this.itemsInCart = []
  }
}