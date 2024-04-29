import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySvgPicComponent } from './my-svg-pic.component';

describe('MySvgPicComponent', () => {
  let component: MySvgPicComponent;
  let fixture: ComponentFixture<MySvgPicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MySvgPicComponent]
    });
    fixture = TestBed.createComponent(MySvgPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
