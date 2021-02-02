import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SpriteSheetDetailComponent } from './sprite-sheet-detail.component';

describe('SpriteSheetDetailComponent', () => {
  let component: SpriteSheetDetailComponent;
  let fixture: ComponentFixture<SpriteSheetDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SpriteSheetDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpriteSheetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
