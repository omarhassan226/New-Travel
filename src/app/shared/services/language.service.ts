import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

/**
 * LanguageService is responsible for managing the application's language settings.
 * It allows toggling between languages and provides the current language as an observable.
 */
@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  /**
   * A BehaviorSubject that holds the current language as a string.
   * Default value is 'en' (English).
   */
  private currentLangSubject = new BehaviorSubject<string>('en');

  /**
   * An observable that emits the current language value whenever it changes.
   */
  currentLang$ = this.currentLangSubject.asObservable();

  /**
   * Creates an instance of LanguageService.
   * @param translate - The TranslateService instance used for translation functionalities.
   */
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }

  /**
   * Toggles the current language between English ('en') and Arabic ('ar').
   * Updates the BehaviorSubject and applies the new language using TranslateService.
   *
   * @returns {void} This function does not return any value.
   */
  toggleLanguage(): void {
    const newLang = this.currentLangSubject.value === 'en' ? 'ar' : 'en';
    this.currentLangSubject.next(newLang);
    this.translate.use(newLang);
  }
}
