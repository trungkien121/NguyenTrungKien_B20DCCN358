import { Component } from "@angular/core";
import { TranslationService } from "src/app/_service/translation.service";

@Component({
  selector: "app-translator",
  templateUrl: "./translator.component.html",
})
export class TranslatorComponent {
  translatedText: string = "";

  constructor(private translationService: TranslationService) {}

  translateText(text: string) {
    this.translationService.translate(text).subscribe((response: any) => {
      this.translatedText = response.data.translations[0].translatedText;
    });
  }
}
