import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SelectCommonComponent } from "./selectCommon/selectCommon.component";
import { ConfirmDialogCommonComponent } from "./confirmDialogCommon/confirmDialogCommon.component";

@NgModule({
  declarations: [SelectCommonComponent, ConfirmDialogCommonComponent],
  imports: [CommonModule, FormsModule],
  exports: [SelectCommonComponent, ConfirmDialogCommonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CommonsModule {}
