import { Product } from "./product";

export class Order {
    id: number = null;
    name: string = null;
    date: Date = null;
    products: Product[] = [];
    constructor(name: string = 'default'){
        this.name = name;
        this.date = new Date();
    }
}
