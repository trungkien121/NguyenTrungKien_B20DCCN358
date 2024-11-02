import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TranslateModule } from "@ngx-translate/core";
import { OneImageComponent } from "./oneImage/oneImage.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [OneImageComponent],
  imports: [CommonModule, TranslateModule, HttpClientModule],
  providers: [],
  exports: [OneImageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppFileUploadModule {}
