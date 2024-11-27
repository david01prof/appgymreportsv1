import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-table-striped-rows',
  standalone: true,
  imports: [CommonModule,TableModule],
  templateUrl: './table-striped-rows.component.html',
  styleUrl: './table-striped-rows.component.scss'
})
export class TableStripedRowsComponent {
  products!: any[];


  ngOnInit() {
      this.products = [
        {
          id: '1000',
          code: 'f230fh0g3',
          name: 'Bamboo Watch',
          description: 'Product Description',
          image: 'bamboo-watch.jpg',
          price: 65,
          category: 'Accessories',
          quantity: 24,
          inventoryStatus: 'INSTOCK',
          rating: 5
      },
      {
        id: '1001',
        code: 'f230fh0g3',
        name: 'Bamboo Watch2',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5
    },
    {
      id: '1002',
      code: 'f230fh0g3',
      name: 'Bamboo Watch2',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
  }
      ]
  }
}
