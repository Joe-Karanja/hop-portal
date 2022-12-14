import { Component } from "@angular/core";

@Component({
  selector: "app-products-compact",
  templateUrl: "./products-compact.component.html",
  styleUrls: ["./products-compact.component.scss"]
})
export class ProductsCompactComponent {
  products: any[] = [];
  num = 1;
  stars: number[] = [1, 2, 3, 4, 5];

  constructor() {
    for (let i = this.num; i <= 21; i += 1) {
      this.addProducts(i);
    }
  }

  addProducts(i) {
    this.products.push({
      id: i,
      price: (Math.random() * (0.0 - 10.0) + 10.0).toFixed(2),
      rating: Math.floor(Math.random() * 6),
      status: ["", "", "", "sale"][Math.floor(Math.random() * 4)],
      discounted: ["", "", "", "discounted"][Math.floor(Math.random() * 4)],
      discount: (Math.random() * (0.0 - 10.0) + 10.0).toFixed(2),
      name: [
        "Blouse",
        "Casual Shirt",
        "Plaid Shirt",
        "Long Sleeve",
        "Denim Jacked",
        "Fur Coat",
        "Crop Top",
        "Stripe Tee"
      ][Math.floor(Math.random() * 8)],
      description: ["B & W", "Grey", "Black", "Green", "Black"][
        Math.floor(Math.random() * 5)
      ]
    });
  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  isMac(): boolean {
    let bool = false;
    if (
      navigator.platform.toUpperCase().indexOf("MAC") >= 0 ||
      navigator.platform.toUpperCase().indexOf("IPAD") >= 0
    ) {
      bool = true;
    }
    return bool;
  }
}
