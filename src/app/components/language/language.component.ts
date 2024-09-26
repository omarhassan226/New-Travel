import { Component } from '@angular/core';
import { LanguageService } from 'src/app/shared/services/language.service';

/**
 * LanguageToggleComponent allows users to switch between languages.
 * It updates the displayed language based on the current selection.
 */
@Component({
  selector: 'app-language-toggle',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageToggleComponent {
  language: string;

  constructor(private languageService: LanguageService) {
    /**
     * Subscribe to language changes and set the display language accordingly.
     */
    this.languageService.currentLang$.subscribe(lang => {
      this.language = lang === 'en' ? 'Arabic' : 'English';
    });
  }

  /**
   * Toggles the current language between English and Arabic.
   */
  toggleLanguage() {
    this.languageService.toggleLanguage();
  }
}
