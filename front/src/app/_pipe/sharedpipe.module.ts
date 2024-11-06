import { ModuleWithProviders, NgModule } from "@angular/core";
import { GenderPipe } from "./gender.pipe";

@NgModule({
  declarations: [GenderPipe],
  exports: [GenderPipe],
})
export class SharedPipeModule {
  static forRoot(): ModuleWithProviders<SharedPipeModule> {
    return {
      ngModule: SharedPipeModule,
      //   providers: [ CurrencySuffixPipe ]
    };
  }
}
