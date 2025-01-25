export interface InventoryItem {
    _id: string;
    name: string;
    description?: string;
    price: number;
    quantity: number;
    lastModified: Date;
    category: string;
}