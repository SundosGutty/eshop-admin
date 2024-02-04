import { Component, Input } from '@angular/core';
import { ORDER_STATUS } from '../../constants/order.constants';
import { Category } from '../../models/category';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent {
  @Input() tableData: any[] = [];
  @Input() columnHeaders: string[] = [];
  @Input() sortableColumn: string = '';
  @Input() actionButtons: any[] = []; 
  orderStatus = ORDER_STATUS;

  filteredColumn = ['Name', 'Price']
  sortDirections: { [key: string]: number } = {};

  isAscendingOrder = true;

  constructor() { }


  ngOnInit(){
    this.columnHeaders.forEach(header => {
      this.sortDirections[header] = 0; 
    });
  }


  
  
  
  sortData(column: string): void {
    if (this.filteredColumn.includes(column)) {
  
      if (column === 'Price') {
        this.sortPrice(column);
      } else {
        this.sortDirections[column] = this.sortDirections[column] === 1 ? -1 : 1;  
        Object.keys(this.sortDirections).forEach(key => {
          if (key !== column) {
            this.sortDirections[key] = 0;
          }
        });
        this.tableData.sort((a, b) => {
          const fieldA = a[column.toLowerCase()];
          const fieldB = b[column.toLowerCase()];
  
          if (typeof fieldA === 'string' && typeof fieldB === 'string') {
            return fieldA.localeCompare(fieldB) * this.sortDirections[column];
          } else {
            return (fieldA - fieldB) * this.sortDirections[column];
          }
        });
      }
    }
  }
  
  sortPrice(column: string): void {
    if (column === 'Price') {
      if (this.sortableColumn === column) {
        this.sortDirections[column] = this.sortDirections[column] === 1 ? -1 : 1;
      } else {
        this.sortDirections[column] = 1;
        this.sortableColumn = column;
      }
        Object.keys(this.sortDirections).forEach(key => {
        if (key !== column) {
          this.sortDirections[key] = 0;
        }
      });
        this.tableData.sort((a, b) => {
        const priceA = parseFloat(a[column.toLowerCase()]);
        const priceB = parseFloat(b[column.toLowerCase()]);
  
        return (priceA - priceB) * this.sortDirections[column];
      });
    }
  }

}