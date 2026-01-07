export interface ProductFilter {
  CategoryId?: string | string[]
  MinPrice?: string
  MaxPrice?: string
  Materials?: string | string[]
  Sizes?: string | string[]
  Colors?: string | string[]
}
