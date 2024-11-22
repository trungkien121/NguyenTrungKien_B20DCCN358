import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/_service/auth/authentication.service";
import { ToastrService } from "ngx-toastr";
import { LoaderService } from "src/app/_service/comm/loader.service";
import { Cookie } from "ng2-cookies";
import { AuthConstant } from "src/app/_constant/auth.constant";

declare var $: any;

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  language: string | undefined;
  srcIconLang: string | undefined;

  isAuthenticate: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private loading: LoaderService
  ) {}

  ngOnInit(): void {
    if (Cookie.check(AuthConstant.ACCESS_TOKEN_KEY)) {
      this.isAuthenticate = true;
    }
  }

  logout() {
    this.authService.logOut(true);
  }

  login() {
    this.authService.logIn();
  }

  useLanguage(language: string, $event: any) {}

  getIconLang() {}
}
