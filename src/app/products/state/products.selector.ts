import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductsState } from "./products.state";
import { sumProducts } from "src/app/utils/sum-products";
import { getRouterSelectors } from "@ngrx/router-store";
import * as fromProductsState from './products.state'
import * as fromProducts from './products.reducer'

export const selectProductsState = createFeatureSelector<fromProductsState.ProductsState>('products');

export const selectProducts = createSelector(
  selectProductsState,
  //product feature slice
  fromProducts.selectProducts
)

export const selectProductsEntities = createSelector(
  selectProductsState,
  fromProducts.selectProductEntities
)
export const selectProductsLoading = createSelector(
  selectProductsState,
  //loading feature slice
  (productsState) => productsState.loading
)
export const selectProductsShowProductCode = createSelector(
  selectProductsState,
  // show product code feature slice
  (productsState) => productsState.showProductCode
)

export const selectProductsTotal = createSelector(
  selectProducts,
  //product feature slice
  (products) => sumProducts(products)
)

export const selectProductsErrorMessage = createSelector(
  selectProductsState,
  (productsState) => productsState.errorMessage
)

export const { selectRouteParams } = getRouterSelectors();
export const selectProductById = createSelector(
  selectProductsEntities,
  selectRouteParams,
  (productsEntities, { id }) => productsEntities[id]
);

