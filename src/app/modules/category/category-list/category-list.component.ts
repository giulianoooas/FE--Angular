import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { UserStatusArray } from '../../../../app/models/user.model';
import { Book } from '../../../models/book.model';
import { Category } from '../../../models/category.model';
import { AuthService } from '../../../services/auth.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  public categories: Category[] = [];
  public categoryIdForShowingBooks = -1;
  public booksToShow: Book[] = [];
  public userId: number;
  public userStatus: number;
  public allUserStatus = UserStatusArray;
  public books: Book[] = [];
  public showButtonsForBooks= new Map<number,boolean>();

  public constructor(private categoryService: CategoryService,
                     private authService: AuthService,
                     private bookService: BookService) { }

  public ngOnInit(): void {
    this.getAllBooks();
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
    this.userId = this.authService.getUserId();
    const status = this.authService.getUserStatus();
    for (let i = 0; i < this.allUserStatus.length; i ++){
      if (this.allUserStatus[i] === status){
        this.userStatus = i;
        break;
      }
    }
  }

  public showBooks(categoryId: number): void{
    this.categoryIdForShowingBooks = categoryId;
    this.booksToShow = [];
    for (const book of this.books){
      if (book.categoryId === categoryId){
        this.booksToShow.push(book);
      }
    }
  }

  public deleteCategory(categoryId: number): void{
    this.categoryService.deleteCategory(categoryId).subscribe((categories) => {
      this.categories = categories;
    })
  }

  public editCategory(category: Category): void{
    this.categoryService.editCategory(category).subscribe((categoryUpdated) => {
      for (const category of this.categories){
        if (category.categoryId == categoryUpdated.categoryId){
          category.name= categoryUpdated.name;
          break;
        }
      }
    })
  }

  public createCategory(category: Category): void{
    this.categoryService.createCategory(category).subscribe((category) => {
      this.categories.push(category);
    })
  }

  public setCategoryIdForShowingBooks(value: number): void{
    this.categoryIdForShowingBooks = value;
  }

  private getAllBooks(): void{
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
      for (const book of books){
        this.showButtonsForBooks.set(book.categoryId,true);
      }
    })
  }
}
