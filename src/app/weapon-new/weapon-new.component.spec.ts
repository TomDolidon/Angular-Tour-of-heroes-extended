import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponNewComponent } from './weapon-new.component';

describe('WeaponNewComponent', () => {
  let component: WeaponNewComponent;
  let fixture: ComponentFixture<WeaponNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeaponNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
