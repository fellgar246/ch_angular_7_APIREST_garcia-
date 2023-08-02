import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../models';


@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent {
  displayedColumns: string[] =  ['id', 'name', 'description', 'actions'];

  @Input()
  dataSource: Category[] = [];

  @Output()
  deleteCategory = new EventEmitter<Category>();

  @Output()
  editCategory = new EventEmitter<Category>();
}
