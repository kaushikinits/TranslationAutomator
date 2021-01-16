import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Source.Component.TsComponent } from './source.component.ts.component';

describe('Source.Component.TsComponent', () => {
  let component: Source.Component.TsComponent;
  let fixture: ComponentFixture<Source.Component.TsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Source.Component.TsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Source.Component.TsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
