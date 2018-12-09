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
    this.observableProducts$ = this.db.list('/products').snapshotChanges();
   }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.observableProducts$.pipe(
      map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }));
  }

  get(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }
}
