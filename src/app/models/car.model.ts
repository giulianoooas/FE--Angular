export interface Car{
    carId: number;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    categoryId: number;
    userId: number;
}

export interface CarFilter{
  minPrice: number,
  name: string
}
