import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SpriteDetailComponent } from './sprite-detail.component';

describe('SpriteDetailComponent', () => {
  let component: SpriteDetailComponent;
  let fixture: ComponentFixture<SpriteDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SpriteDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpriteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
