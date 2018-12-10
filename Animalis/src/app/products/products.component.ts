import { CategoryService } from 'src/app/category.service';
import { ProductService } from './../product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products$;
  categories$;

  constructor(private productService: ProductService, private categoryService: CategoryService) {
    this.products$ = productService.getAll();
    this.categories$ = categoryService.getAll();
  }



}
