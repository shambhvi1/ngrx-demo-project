import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductsService } from "../products.service";
import { ProductsAPIActions, ProductsPageActions } from "./products.actions";
import { catchError, concatMap, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { Router } from "@angular/router";

@Injectable()

export class ProductEffects {
  constructor(private action$: Actions, private productsService: ProductsService, private router: Router) { }

  ngrxOnInitEffects() {
    return ProductsPageActions.loadProducts();
  }

  loadProducts$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProductsPageActions.loadProducts),
      exhaustMap(() =>
        this.productsService.getAll().pipe(
          map((products) => ProductsAPIActions.productsLoadedSuccess({ products })
          ),
          catchError(
          (error) => of(ProductsAPIActions.productsLoadedFailed({message: error}))
        ))
      )));

  addProduct$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProductsPageActions.addProduct),
      mergeMap(({product}) =>
        this.productsService.add(product).pipe(
          map((newProduct) => ProductsAPIActions.productsAddedSuccess({ product: newProduct })
          ),
          catchError(
            (error) => of(ProductsAPIActions.productAddedFailed({ message: error }))
          ))
      )));
  updateProduct$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProductsPageActions.addProduct),
      concatMap(({ product }) =>
        this.productsService.update(product).pipe(
          map((newProduct) => ProductsAPIActions.productsUpdateSuccess({ update: {id: product.id, changes: newProduct} })
          ),
          catchError(
            (error) => of(ProductsAPIActions.productsUpdateFailed({ message: error }))
          ))
      )));
  deleteProduct$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProductsPageActions.deleteProduct),
      concatMap(({ id }) =>
        this.productsService.delete(id).pipe(
          map(() => ProductsAPIActions.productsDeleteSuccess({  id })
          ),
          catchError(
            (error) => of(ProductsAPIActions.productsDeleteFailed({ message: error }))
          ))
      )));

  redirectToProductsPage = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          ProductsAPIActions.productsAddedSuccess,
          ProductsAPIActions.productsUpdateSuccess,
          ProductsAPIActions.productsDeleteSuccess
        ),
        tap(() => this.router.navigate(['/products']))
      ),
    { dispatch: false } //noone is listening
  );
}
