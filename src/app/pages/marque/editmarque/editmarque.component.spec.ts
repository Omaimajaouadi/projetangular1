import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmarqueComponent } from './editmarque.component';

describe('EditmarqueComponent', () => {
  let component: EditmarqueComponent;
  let fixture: ComponentFixture<EditmarqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditmarqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
