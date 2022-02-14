import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogService } from '../../../../app/services/dialog.service';
import { Book } from '../../../models/book.model';
import { Category } from '../../../models/category.model';
import { AuthService } from '../../../services/auth.service';
import { BookService } from '../../../services/book.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit, OnDestroy {
  public errorMessage: string[] = [];
  public book: Book ={
    name: '',
    bookId: -1,
    categoryId: -1,
    imageUrl: '',
    description: '',
    author: '',
    price: -1,
    userId: this.authService.getUserId()
  };
  private bookId = -1;
  public categories:Category[] = [];
  public formGroup: FormGroup = new FormGroup({
    name: new FormControl(''),
    categoryId: new FormControl(-1),
    description: new FormControl(''),
    price: new FormControl(0),
    imageUrl: new FormControl(''),
    author: new FormControl('')
  });
  public isEditMode = false;
  public subscription: Subscription =
    new Subscription();

  public constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    public authService: AuthService) { }

  public ngOnInit(): void {
    this.setEditMode();
    this.setBook();
    this.createFormSubscription();
    this.getAllCategories();
  }

  private getAllCategories(): void{
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    })
  }

  private setEditMode(): void{
    if (this.router.url.includes('edit')){
      this.isEditMode = true;
    }
  }

  private createFormSubscription(): void{
    this.subscription.add(
      this.formGroup.valueChanges.subscribe((data) => {
        if (data.price < 0){
          data.price = 0;
          this.formGroup.controls['price'].setValue(0);
        }
        this.book.categoryId = data.categoryId;
        this.book.description = data.description;
        this.book.imageUrl = data.imageUrl;
        this.book.name = data.name;
        this.book.price = data.price;
        this.book.author = data.author;
      })
    );
  }

  private setBook(): void{
    if (this.isEditMode){
      this.bookId = Number(this.route.snapshot.paramMap.get('bookId'));
      this.bookService.getBookById(this.bookId).subscribe(({book,categoryName}) => {
        this.formGroup.controls['name'].setValue(book.name);
        this.formGroup.controls['price'].setValue(book.price);
        this.formGroup.controls['categoryId'].setValue(book.categoryId);
        this.formGroup.controls['description'].setValue(book.description);
        this.formGroup.controls['imageUrl'].setValue(book.imageUrl);
        this.formGroup.controls['author'].setValue(book.author);
        this.bookId = book.bookId;
        this.book.bookId = book.bookId;
      })
    }
  }

  private validateBook(): boolean{
    this.errorMessage = [];
    this.validateName();
    this.validateDescription();
    if (this.book.price <= 0){
      this.errorMessage.push('  Price must be strict positive.');
    }
    if (this.book.categoryId < 0){
      this.errorMessage.push('  Book must have a category.');
    }
    if (this.book.imageUrl.length == 0){
      this.errorMessage.push('  Book must have an image.');
    }
    if (this.book.author.length == 0){
      this.errorMessage.push('  Book must have an author.');
    }
    return this.errorMessage.length == 0;
  }

  private validateName(): void{
    if (this.book.name.length == 0){
      this.errorMessage.push('  Name is empty.\n');
      return;
    }
    for (let i=0; i< this.book.name.length; i ++){
      const chr = this.book.name.charAt(i);
      if (chr !== '')
        return;
    }
    this.errorMessage.push('  Name must have not only spaces.\n');
  }

  private validateDescription(): void{
    if (this.book.description.length == 0){
      this.errorMessage.push('  Description is empty.\n');
      return;
    }
    for (let i=0; i< this.book.description.length; i ++){
      const chr = this.book.description.charAt(i);
      if (chr !== '')
        return;
    }
    this.errorMessage.push('  Description must have not only spaces.\n');
  }

  public createBook(): void{
    if (this.validateBook())
      this.bookService.createBook(this.book).subscribe((book) => {
        this.router.navigateByUrl(`books/${book.bookId}`);
      })
  }

  public editBook(): void{
    if (this.validateBook())
      this.bookService.editBook(this.book).subscribe((book) => {
        this.router.navigateByUrl(`books/${book.bookId}`);
      })
  }

  public goBack(): void{
    this.router.navigateByUrl(`books/${this.bookId}`)
  }

  public ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
