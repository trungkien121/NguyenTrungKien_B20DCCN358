import { Component } from "@angular/core";
import { Cookie } from "ng2-cookies";
import { AuthConstant } from "./_constant/auth.constant";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  constructor() {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const _token = params.get("access_token");
    // debugger;
    if (_token) {
      Cookie.set(
        AuthConstant.ACCESS_TOKEN_KEY,
        _token,
        AuthConstant.TOKEN_EXPIRE,
        "/"
      );
    }
  }
}
