export interface Car{
    carId: number;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    comments?:Comment[];
}
