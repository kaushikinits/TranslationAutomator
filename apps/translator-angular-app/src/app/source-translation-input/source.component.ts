import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISourceMetaResponse } from './../../data-models/models';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-source.component.ts',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss'],
})
export class SourceComponent {
  acceptSourceFileExt: string = '.xlsx';
  acceptTemplateFileExt: string = '.json';
  @ViewChild('nativeFileUploadControl_source')
  nativeFileUploadControlSource: ElementRef;
  @ViewChild('nativeFileUploadControl_template')
  nativeFileUploadControlTemplate: ElementRef;
  constructor(private _Router: Router, private _HttpClient: HttpClient) {}

  navigateToPlayground() {
    let SourceFileRef = this.nativeFileUploadControlSource.nativeElement.files;
    let templateFileRef = this.nativeFileUploadControlTemplate.nativeElement
      .files;
    if (SourceFileRef && templateFileRef) {
      this.uploadFileObject(SourceFileRef[0], templateFileRef[0]).subscribe(
        (response: any) => {
          this.initFileProcessing(response.key);
          console.log('file uploaded');
        }
      );
    }
    // this._Router.navigateByUrl('/playground');
  }

  // make http call for upload
  uploadFileObject(Sourcefile: File, templateFile: File): Observable<any> {
    const _FORM_DATA = new FormData();
    _FORM_DATA.append('sourceFile', Sourcefile);
    _FORM_DATA.append('templateFile', templateFile);
    _FORM_DATA.append('body', 'hello world');
    return this._HttpClient.post(
      'http://localhost:3333/api/uploadfile',
      _FORM_DATA
    );
  }

  initFileProcessing(Id: string) {
    const request = {
      key: Id,
    };
    this._HttpClient
      .post('http://localhost:3333/api/getMetaDataFromSource', request)
      .subscribe((data: ISourceMetaResponse) => {
        if (data) {
          // redirect to file processing page - Angular
          console.log(data);
          this._Router.navigate(['/playground'], {
            state: { id: data.Id, ...data.sourceMeta },
          });
        }
      });
  }
}
