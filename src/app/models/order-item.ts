export class OrderItem {
    product: number;
    quantity: number;
    constructor(productId: number, quantity: number){
        this.product = productId;
        this.quantity = quantity;
    }
}
