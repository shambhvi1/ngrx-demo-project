import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Product } from "../product.model";
import { Update } from "@ngrx/entity";

export const ProductsPageActions = createActionGroup({
  source: 'Products Page',
  events: {
    'Toggle show Product Code': emptyProps(),
    'Load Products': emptyProps(),
    'Add Product': props<{ product: Product }>(),
    'Update Product': props<{ product: Product }>(),
    'Delete Product': props<{ id: number }>()
  }
})

export const ProductsAPIActions = createActionGroup({
  source: 'Products API',
  events: {
    'Products Loaded Success': props<{ products: Product[] }>(),
    'Products Loaded Failed': props<{ message: string }>(),
    'Products Added Success': props<{ product: Product }>(),
    'Product Added Failed': props<{ message: string }>(),
    'Products Update Success': props<{ update: Update<Product> }>(),
    'Products Update Failed': props<{ message: string }>(),
    'Products Delete Success': props<{ id: number }>(),
    'Products Delete Failed': props<{ message: string }>(),
  }
})
