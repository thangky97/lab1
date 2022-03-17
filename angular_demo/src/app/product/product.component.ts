import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  products = [
    {
      'id': 1,
      'name': 'Iphone',
      'description': 'Description',
      'price': 1200000
    }
  ]
  product1 = this.products;
  newproduct = {
    'id': 0,
    'name': '',
    'description': '',
    'price': 0
  }

  onSubmit(data: any) {
    if (this.isEdit) {
      for (let i = 0; i < this.product1.length; i++) {
        if (this.product1[i].id === this.newproduct.id) {
          this.product1[i] = this.newproduct;
        }
      }
      this.isEdit = false;
    } else {
      console.log(data);
      data.id = this.product1.length + 1;
      if (data.id != this.product1.filter(function (product) { })) {
        this.product1.push(data)
        this.newproduct = {
          'id': 0,
          'name': '',
          'description': '',
          'price': 0
        }
      }


    }

    console.log(this.products);

  }
  isEdit = false;
  edit(obj: any) {
    this.newproduct = obj;
    console.log(this.newproduct);

    return this.isEdit = true;
  }
  remove(productId: any) {
    this.product1 = this.product1.filter(function (product) {
      return product.id !== productId
    });
  }
}
