import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { LoaderService } from "src/app/_service/comm/loader.service";
import { Cookie } from "ng2-cookies";
import { AuthConstant } from "src/app/_constant/auth.constant";
import { NguoidungService } from "src/app/_service/auth/nguoidung.service";

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
    private authService: NguoidungService,
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
