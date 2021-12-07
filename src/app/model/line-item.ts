import { Product } from "../models/product";


export class LineItem {
    product: Product = new Product();
    quantity: number = 0;

    get amount(): number {
        return this.product.unit_price * this.quantity * (100 - this.product.discount) / 100;
    }

    get savings(): number {
        return this.product.unit_price * this.quantity * this.product.discount / 100;
    }
}
