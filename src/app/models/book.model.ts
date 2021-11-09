export interface Book{
    bookId: number;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    categoryId: number;
    author: string;
    userId: number;
}

export interface BookFilter{
  minPrice: number,
  name: string
}
