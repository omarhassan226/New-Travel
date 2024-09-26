import { Component } from '@angular/core';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-language-toggle',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageToggleComponent {
  language: string;

  constructor(private languageService: LanguageService) {
    this.languageService.currentLang$.subscribe(lang => {
      this.language = lang === 'en' ? 'Arabic' : 'English';
    });
  }

  toggleLanguage() {
    this.languageService.toggleLanguage();
  }
}
