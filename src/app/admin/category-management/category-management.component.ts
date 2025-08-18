import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

// interface Category {
//   CategoryId: number;
//   CategoryName: string;
//   ParentCategoryId: number;
//   UserId: number;
// }
@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-management.component.html',
  styleUrl: './category-management.component.css'
})
export class CategoryManagementComponent implements OnInit {
// categories: Category[] = [
//     { CategoryId: 1, CategoryName: 'Electronics', ParentCategoryId: 0, UserId: 1 },
//     { CategoryId: 2, CategoryName: 'Mobiles', ParentCategoryId: 1, UserId: 1 },
//     { CategoryId: 3, CategoryName: 'Fashion', ParentCategoryId: 0, UserId: 2 }
//   ];

  categoryForm!: FormGroup;
  isEditing: boolean = false;
  editId: number | null = null;
  
  successMessage: string='';
  errorMessage: string='';
  categoryList: any;

  constructor(private fb: FormBuilder, private productService : ProductService) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categoryId: [0],
      categoryName: ['', Validators.required],
      parentCategoryId: [0],
      userId: [0]
    });

    this.getCategoryList();
  }

getCategoryList(){
this.productService.getAllCategory().subscribe({
  next: (res:any) => {
    this.successMessage = 'successful!';
    this.errorMessage = ''; 

    this.categoryList=res.data;
    console.log(this.categoryList);
  },
  error: (err:any) => {
    this.errorMessage = 'Failed!! Please try again.';
    this.successMessage = '';
    console.error(err); 
  },
  complete: () => {
    // optional - any cleanup after complete
  }
});
}

  onSubmit() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    if (this.isEditing && this.editId !== null) {
      // Update category
     
      this.isEditing = false;
      this.editId = null;
    } else {
      // Add new category

    }

    this.categoryForm.reset({ CategoryId: 0, CategoryName: '', ParentCategoryId: 0, UserId: 0 });
  }

  onEdit(category:any) {
    this.categoryForm.patchValue(category);
    this.isEditing = true;
    this.editId = category.categoryId;
  }

  onDelete(categoryId: number) {
     
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteCategoryById(categoryId).subscribe(() => {
        this.getCategoryList();
      });
    }
  }
  }

