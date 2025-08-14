import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productSearch',
  standalone: true
})
export class ProductSearchPipe implements PipeTransform {

  
transform(products: any[], searchText: string): any[] {
    if (!products || !searchText) {
      return products;
    }

    searchText = searchText.toLowerCase();

    return products.filter(product =>
      (product.productName && product.productName.toLowerCase().includes(searchText)) ||
      (product.productShortName && product.productShortName.toLowerCase().includes(searchText)) ||
      (product.productDescription && product.productDescription.toLowerCase().includes(searchText))
    );
  }

}
