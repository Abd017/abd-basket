import { LineItem } from "@model/line-item";

export class Order {
    id: (number | undefined);
    orderDate: (string | undefined) = new Date().toISOString();
    orderStatus: string = 'PENDING';
    customerId: (number | undefined);
    lineItems: LineItem[] = [];
}
