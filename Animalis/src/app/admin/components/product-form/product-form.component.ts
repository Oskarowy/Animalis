import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
categories$;
product:any = {}; 
id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService: ProductService) {
      this.categories$ = categoryService.getAll();

      this.id = this.route.snapshot.paramMap.get('id');
      if(this.id) this.productService.get(this.id).subscribe(p => this.product = p);
  }

  save(product) {
    if(this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }
  
  delete() {
    if(!confirm('Czy na pewno chcesz usunąć ten produkt?')) return; 
    
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
