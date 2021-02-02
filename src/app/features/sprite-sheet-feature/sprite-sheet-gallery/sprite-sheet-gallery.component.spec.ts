import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SpriteSheetGalleryComponent } from './sprite-sheet-gallery.component';

describe('SpriteSheetGalleryComponent', () => {
  let component: SpriteSheetGalleryComponent;
  let fixture: ComponentFixture<SpriteSheetGalleryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SpriteSheetGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpriteSheetGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
