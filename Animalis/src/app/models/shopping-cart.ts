import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(
        public productId: string, 
        public itemsMap: { [key: string]: ShoppingCartItem }) {  
        
            this.itemsMap = itemsMap || {}; 

            for (let prodId in itemsMap) {
            let item = itemsMap[prodId];
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }
    }

    get totalPrice() {
        let sum = 0;
        for (let productId in this.items)
           sum += this.items[productId].totalPrice;

        return sum;
    }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.itemsMap)
          count += this.itemsMap[productId].quantity;
          
        return count;
    }
}