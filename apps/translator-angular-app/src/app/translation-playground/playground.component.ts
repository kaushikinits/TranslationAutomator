import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ITranslatedContent } from './../../data-models/models';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
})
export class PlaygroundComponent implements OnInit {
  supportedLanguages: Array<string> = [];
  FromLanguage: string;
  ToLanguage: string;
  payload: any;

  constructor(private _Router: Router, private _HttpClient: HttpClient) {
    const data = this._Router.getCurrentNavigation().extras.state;
    if (!data) {
      return;
    }
    console.log(data);
    this.payload = { id: data.id };
    this.supportedLanguages = [...data.SupportedLanguages];
    this.FromLanguage = this.supportedLanguages[0];
    this.ToLanguage = this.supportedLanguages[1];
  }

  ngOnInit(): void {}

  onFromLanguageChange(newLang) {}
  OnToLanguageChange(newLang) {}
  downloadTranslatedCopy() {
    this.payload = Object.assign(this.payload, {
      FromLanguage: this.FromLanguage,
      ToLanguage: this.ToLanguage,
    });
    this._HttpClient
      .post('http://localhost:3333/api/createTranslatedJson', this.payload)
      .subscribe((data: ITranslatedContent) => {
        console.log(data);
        if (data.filePath) {
          window.open(data.filePath, 'BLANK');
        }
      });
    console.log('request data', this.payload);
  }
}
