import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading = true;
  isEnglish = false

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en')
  }

  switchLanguage() {
    this.isEnglish = !this.isEnglish;
    const lang = this.isEnglish ? 'en' : 'ar';
    this.translate.use(lang);
  }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}
