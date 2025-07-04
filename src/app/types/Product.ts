export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    storage: number;
    image_url: string;
    score: 0 | 1 | 2 | 3 | 4 | 5;
}