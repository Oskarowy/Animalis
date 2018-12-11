import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
observableProducts$: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.observableProducts$ = this.db.list('/products', ref => ref.orderByChild('title')).snapshotChanges();
   }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.observableProducts$.pipe(
      map(changes => {
        return changes.map(c => ({ 
          key: c.key,
          title: c.payload.val().title,
          imageUrl: c.payload.val().imageUrl,
          price: c.payload.val().price,
          category: c.payload.val().category
        }));
    }));
  }

  get(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
