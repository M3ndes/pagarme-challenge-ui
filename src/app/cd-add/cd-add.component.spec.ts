import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdAddComponent } from './cd-add.component';

describe('CdAddComponent', () => {
  let component: CdAddComponent;
  let fixture: ComponentFixture<CdAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
