import { Component, OnInit } from "@angular/core";
import { OptionSelect } from "src/app/_model/common/Option";
import { SearchModel } from "src/app/_model/common/Search";
import { Product } from "src/app/_model/product";
import { ProductService } from "src/app/_service/product.service";

@Component({
  selector: "app-ncc",
  templateUrl: "./ncc.component.html",
})
export class NCCComponent implements OnInit {
  products: Product[] = [];
  modelSearch: SearchModel = {};
  optionLabel: string = "";

  statusOptions: OptionSelect[] = [];
  visibilityOptions: OptionSelect[] = [];
  categoryOption: OptionSelect[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
  
  }

  
}
