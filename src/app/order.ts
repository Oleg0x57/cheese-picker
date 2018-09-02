export class OrderRow {
    productId: number = null;
    quantity: number = 0;
}

export class Order {
    id: number = null;
    username: string = null;
    date: Date = null;
    rows: OrderRow[] = [];
    constructor(name: string = 'default') {
        this.username = name;
        this.date = new Date();
    }
}
