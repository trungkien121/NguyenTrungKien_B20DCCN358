import { Component, OnInit } from "@angular/core";
import { OptionSelect } from "src/app/_model/common/Option";
import { SearchModel } from "src/app/_model/common/Search";
import { Product } from "src/app/_model/product";
import { ProductService } from "src/app/_service/product.service";

@Component({
  selector: "app-product-createment",
  templateUrl: "./product-createment.component.html",
  styleUrls: ["./product-createment.component.css"],
})
export class ProductCreatementComponent implements OnInit {
  products: Product[] = [];
  modelSearch: SearchModel = {};
  optionLabel: string = "";

  statusOptions: OptionSelect[] = [];
  visibilityOptions: OptionSelect[] = [];
  categoryOption: OptionSelect[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.statusOptions = [
      {
        name: "Đang bán",
        value: "1",
      },
      {
        name: "Ngừng bán",
        value: "0",
      },
    ];

    this.visibilityOptions = [
      {
        name: "Hiển thị",
        value: "1",
      },
      {
        name: "Không hiển thị",
        value: "0",
      },
    ];

    this.categoryOption = [
      {
        name: "Thuốc về đầu",
        value: "1",
      },
      {
        name: "Thuốc về dạ dày",
        value: "0",
      },
    ];


  }

  search() {}

  onStatusChange(newStatus: string) {
    this.modelSearch.statusSearch = newStatus;
  }

  onVisibilityChange(newStatus: string) {
    this.modelSearch.visibilySearch = newStatus;
  }

  onCategoryChange(newCategory: string) {
    this.modelSearch.categorySearch = newCategory;
  }
}
