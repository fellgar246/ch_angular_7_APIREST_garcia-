import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../models';

@Component({
  selector: 'app-categories-form-dialog',
  templateUrl: './categories-form-dialog.component.html',
  styleUrls: ['./categories-form-dialog.component.scss']
})
export class CategoryFormDialogComponent {

  editingCategory?: Category;

  nameControl = new FormControl<String | null>(null, [Validators.required, Validators.minLength(2)]);
  descriptionControl = new FormControl<String | null>(null, [Validators.required]);

  categoryForm = new FormGroup({
    name: this.nameControl,
    description: this.descriptionControl,
  });


  constructor(
    private dialogRef: MatDialogRef<CategoryFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Category,
  ) {

    if(this.data){
      this.editingCategory = this.data;
      this.nameControl.setValue(this.data.name);
      this.descriptionControl.setValue(this.data.description);
    }
  }

  onSubmit(): void {
    if(this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.categoryForm.value);
    }
  }
}
