import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SpriteSheetCreateComponent } from './sprite-sheet-create.component';

describe('SpriteSheetCreateComponent', () => {
  let component: SpriteSheetCreateComponent;
  let fixture: ComponentFixture<SpriteSheetCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SpriteSheetCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpriteSheetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
