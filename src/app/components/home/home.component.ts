import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * HomeComponent handles the main home page logic.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading = true;
  isEnglish = false;

  /**
   * Constructor for HomeComponent.
   * @param translate - Service for handling translations.
   */
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  /**
   * Toggles the language between English and Arabic.
   */
  switchLanguage() {
    this.isEnglish = !this.isEnglish;
    const lang = this.isEnglish ? 'en' : 'ar';
    this.translate.use(lang);
  }

  /**
   * Lifecycle hook that is called after component initialization.
   * Initiates a loading timeout.
   */
  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}
