import {  createReducer, on } from "@ngrx/store";
import { ProductsAPIActions, ProductsPageActions } from "./products.actions";
import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Product } from "../product.model";

const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({});

const initialState  = adapter.getInitialState( {
  showProductCode: true,
  loading: false,
  errorMessage: ''
})
export const productsReducer = createReducer(
  initialState,
  on(ProductsPageActions.toggleShowProductCode, (state) => ({
    ...state,
    showProductCode: !state.showProductCode
  })),
  on(ProductsPageActions.loadProducts, (state) => adapter.setAll([],{
    ...state,
    loading: true,
    errorMessage: ''
  })),
  on(ProductsAPIActions.productsLoadedSuccess, (state, { products }) => adapter.setAll(products, {
    ...state,
    loading: false,
  })),
  on(ProductsAPIActions.productsLoadedFailed, (state, { message }) => ({
    ...state,
    products: [],
    errorMessage: message,
    loading: false,
  })),
  on(ProductsPageActions.deleteProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: ''
  })),
  on(ProductsAPIActions.productsDeleteSuccess, (state, { id }) => adapter.removeOne(id, {
    ...state,
    loading: false,
  })),
  on(ProductsAPIActions.productsDeleteFailed, (state, { message }) => ({
    ...state,
    products: [],
    errorMessage: message,
    loading: false,
  })),
  on(ProductsPageActions.addProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: ''
  })),
  on(ProductsAPIActions.productsAddedSuccess, (state, { product }) => adapter.addOne(product, {
    ...state,
    loading: false
  })),
  on(ProductsAPIActions.productAddedFailed, (state, { message }) => ({
    ...state,
    errorMessage: message,
    loading: false,
  })),
  on(ProductsPageActions.updateProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: ''
  })),
  on(ProductsAPIActions.productsUpdateSuccess, (state, { update }) => adapter.updateOne(update, {
    ...state,
    loading: false
  })),
  on(ProductsAPIActions.productsUpdateFailed, (state, { message }) => ({
    ...state,
    errorMessage: message,
    loading: false,
  }))
);


const {
  selectAll,
  selectEntities
} = adapter.getSelectors()

export const selectProductEntities = selectEntities
export const selectProducts= selectAll

