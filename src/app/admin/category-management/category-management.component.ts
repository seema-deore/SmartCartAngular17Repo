import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface Category {
  CategoryId: number;
  CategoryName: string;
  ParentCategoryId: number;
  UserId: number;
}
@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-management.component.html',
  styleUrl: './category-management.component.css'
})
export class CategoryManagementComponent implements OnInit {
categories: Category[] = [
    { CategoryId: 1, CategoryName: 'Electronics', ParentCategoryId: 0, UserId: 1 },
    { CategoryId: 2, CategoryName: 'Mobiles', ParentCategoryId: 1, UserId: 1 },
    { CategoryId: 3, CategoryName: 'Fashion', ParentCategoryId: 0, UserId: 2 }
  ];

  categoryForm!: FormGroup;
  isEditing: boolean = false;
  editId: number | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      CategoryId: [0],
      CategoryName: ['', Validators.required],
      ParentCategoryId: [0],
      UserId: [0]
    });
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    if (this.isEditing && this.editId !== null) {
      // Update category
      const index = this.categories.findIndex(cat => cat.CategoryId === this.editId);
      if (index !== -1) {
        this.categories[index] = { ...this.categoryForm.value, CategoryId: this.editId };
      }
      this.isEditing = false;
      this.editId = null;
    } else {
      // Add new category
      const newCategory = { ...this.categoryForm.value };
      newCategory.CategoryId = this.categories.length > 0 ? Math.max(...this.categories.map(c => c.CategoryId)) + 1 : 1;
      this.categories.push(newCategory);
    }

    this.categoryForm.reset({ CategoryId: 0, CategoryName: '', ParentCategoryId: 0, UserId: 0 });
  }

  onEdit(category: Category) {
    this.categoryForm.patchValue(category);
    this.isEditing = true;
    this.editId = category.CategoryId;
  }

  onDelete(id: number) {
    this.categories = this.categories.filter(cat => cat.CategoryId !== id);
  }
}
