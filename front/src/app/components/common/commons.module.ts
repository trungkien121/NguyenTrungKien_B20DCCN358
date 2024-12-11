import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SelectCommonComponent } from "./selectCommon/selectCommon.component";
import { ConfirmDialogCommonComponent } from "./confirmDialogCommon/confirmDialogCommon.component";

@NgModule({
  declarations: [SelectCommonComponent],
  imports: [CommonModule, FormsModule],
  exports: [SelectCommonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CommonsModule {}
