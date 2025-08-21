import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductSearchPipe } from '../../filters/product-search.pipe';
declare var bootstrap: any;

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FormsModule,ProductSearchPipe],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css'
})
export class ProductManagementComponent implements OnInit {
successMessage:string='';
errorMessage:string='';
searchText:string='';
categoryList:any = [];
productList:any = [];
productForm!: FormGroup;
isEditMode = false;
selectedProduct:any;
selectedProductId: number | null = null;
modalInstance: any;
selectedCategoryName: string=''

constructor(private productService: ProductService,private fb: FormBuilder ) {}

ngOnInit(): void {

  this.getProductList();
  this.getCategoryList();  
  this.initForm();
}

initForm() {
    this.productForm = this.fb.group({
      productSku: ['', Validators.required],
      productName: ['', Validators.required],
      productShortName: ['', Validators.required],
      productPrice: ['', Validators.required],
      productDescription: [''],
      deliveryTimeSpan: [''],
      categoryId: [null],
      categoryName: [''],
      productImageUrl: ['']
    });
  }
getCategoryList(){
this.productService.getAllCategory().subscribe({
  next: (res) => {
    this.successMessage = 'Product added successfully!';
    this.errorMessage = ''; 

    this.categoryList=res.data;
    console.log(this.categoryList);
  },
  error: (err) => {
    this.errorMessage = 'Failed!! Please try again.';
    this.successMessage = '';
    console.error(err); 
  },
  complete: () => {
    // optional - any cleanup after complete
  }
});
}
getProductList(){
    this.productService.getAllProducts().subscribe({
        next: (res: any) => {
          console.log('Request successful:', res.data);
          this.productList=res.data;
        },
        error: (err: any) => {
          console.error('Request Failed:', err);
          // alert('failed');
        },
        complete: () => {
          console.log('Request completed.');
        }
      });
  }

  onselectAllCategories() {
  this.selectedCategoryName = '';
  this.getProductList();
}
onselectCategory(categoryId:any, categoryName: string){
  this.selectedCategoryName = categoryName;
 this.productService.getAllProductsCategoryIdWise(categoryId).subscribe((res:any)=>{
 this.productList= res.data;
 console.log(this.productList);
 })
}

openAddProduct() {
    this.isEditMode = false;
    this.selectedProductId = null;
    this.productForm.reset();
    this.openModal();
  }

  openEditProduct(product: any) {
    this.selectedProduct = product;
    this.isEditMode = true;
    this.selectedProductId = product.productId;

    this.productForm.patchValue({
    productName: product.productName,
    productSku: product.productSku,
    productPrice: product.productPrice,
    productShortName: product.productShortName,
    productDescription: product.productDescription,
    createdDate: product.createdDate,
    deliveryTimeSpan: product.deliveryTimeSpan,
    categoryId: product.categoryId, // ✅ This will set the selected category in dropdown    
    productImageUrl: product.productImageUrl
  });
  console.log(this.selectedProduct);
  console.log(this.productForm.value);
this.openModal();
  }

  

saveProduct() {
    if (this.productForm.invalid) return;
    console.log(this.productForm.value);
   const productData = {
  ProductId: this.isEditMode ? this.selectedProductId : 0,
  "ProductSku": this.productForm.get('productSku')?.value,
  "ProductName": this.productForm.get('productName')?.value,
  "ProductPrice": this.productForm.get('productPrice')?.value,
  "ProductShortName": this.productForm.get('productSku')?.value,
  "ProductDescription":this.productForm.get('productDescription')?.value,
  "CreatedDate": new Date(),
  "DeliveryTimeSpan": this.productForm.get('deliveryTimeSpan')?.value,
  "CategoryId": this.productForm.get('categoryId')?.value,
  "ProductImageUrl": this.productForm.get('productImageUrl')?.value,
  "UserId": 0
}



    if (this.isEditMode && this.selectedProductId !== null) {
      // Update product
      this.productService.updateProduct(productData).subscribe(() => {
        alert("product updated");
       this.getProductList();
        this.closeModal();
      });
    } else {
      // Add new product
      this.productService.createProduct(productData).subscribe(() => {
       this.getProductList();
       alert("product added");
        this.closeModal();
      });
    }
  }    

  deleteProduct(productId: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProductById(productId).subscribe(() => {
        this.getProductList();
      });
    }
  }

  openModal() {
    const modalEl = document.getElementById('productModal');
    this.modalInstance = new bootstrap.Modal(modalEl);
    this.modalInstance.show();
  }

  closeModal() {
    (document.getElementById('productModal') as any).style.display = 'none';
    this.modalInstance.hide();
  }

}
