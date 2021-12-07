import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(ts: TranslateService) {
    ts.setDefaultLang('en'); // 'en' in the base name of the file /src/assets/i18n/en.json
  }

}
