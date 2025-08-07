import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private http: HttpClient) { }
// private apiUrl='https://freeapi.miniprojectideas.com'; // in proxy.conf.json


/* ------------------- to get selected product-details -----------------------------*/

private selectedProduct: any;

  setProduct(product: any) {
    this.selectedProduct = product;
  }

  getProduct() {
    return this.selectedProduct;
  }

  /*--------------------------------------------------------*/

getAllProducts(){
return this.http.get<any>('/api/amazon/GetAllProducts')
}

getAllProductsCategoryIdWise(categoryId:number){
return this.http.get<any>('/api/amazon/GetAllProductsByCategoryId?id='+ categoryId);
}

createProduct(productObj: any){
return this.http.post<any>('/api/amazon/CreateProduct', productObj );
}

// {
//   "ProductId": 0,
//   "ProductSku": "string",
//   "ProductName": "string",
//   "ProductPrice": 0,
//   "ProductShortName": "string",
//   "ProductDescription": "string",
//   "CreatedDate": "2025-08-03T15:04:52.133Z",
//   "DeliveryTimeSpan": "string",
//   "CategoryId": 2147483647,
//   "ProductImageUrl": "string",
//   "UserId": 0
// }

updateProduct(productObj:any){
return this.http.post<any>('/api/amazon/UpdateProduct', productObj );
}


// {
//   "ProductId": 0,
//   "ProductSku": "string",
//   "ProductName": "string",
//   "ProductPrice": 0,
//   "ProductShortName": "string",
//   "ProductDescription": "string",
//   "CreatedDate": "2025-08-03T15:08:33.159Z",
//   "DeliveryTimeSpan": "string",
//   "CategoryId": 2147483647,
//   "ProductImageUrl": "string",
//   "UserId": 0
// }


deleteProductById(productId:number){
return this.http.get<any>('/api/amazon/DeleteProductById?id=' + productId)
}

getProductByProductId(productId:number){
  return this.http.get<any>('/api/amazon/GetProductById?id=' + productId)
}

getCartProductByCustomerId(customerId:number){
  return this.http.get<any>('/api/amazon/GetCartProductsByCustomerId?id=' + customerId)
}


addProductToCart(productObj:any){
return this.http.post<any>('/api/amazon/AddToCart', productObj );
}
// {
//   "CartId": 0,
//   "CustId": 2147483647,
//   "ProductId": 2147483647,
//   "Quantity": 0,
//   "AddedDate": "2025-08-03T15:19:53.245Z"
// }

deleteProductFromCartById(id:number){
return this.http.get<any>('/api/amazon/DeleteProductFromCartById/' + id)
}

/* --------------------------category---------------*/

getAllCategory(){
  return this.http.get<any>('/api/amazon/GetAllCategory')
}

createNewCategory( categoryObj:any){
  return this.http.post<any>('/api/amazon/CreateNewCategory',categoryObj )
}


// {
//   "CategoryId": 0,
//   "CategoryName": "string",
//   "ParentCategoryId": 0,
//   "UserId": 0
// }

// deleteCategoryById( categoryId:any){
//   return this.http.get<any>('/api/amazon/DeleteCategoryById/' + categoryId )
// }

}
