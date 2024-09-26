import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLangSubject = new BehaviorSubject<string>('en');
  currentLang$ = this.currentLangSubject.asObservable();

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }

  toggleLanguage() {
    const newLang = this.currentLangSubject.value === 'en' ? 'ar' : 'en';
    this.currentLangSubject.next(newLang);
    this.translate.use(newLang);
  }
}
