import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpriteSheetCreateComponent } from './sprite-sheet-create.component';

describe('SpriteSheetCreateComponent', () => {
  let component: SpriteSheetCreateComponent;
  let fixture: ComponentFixture<SpriteSheetCreateComponent>;

  beforeEach(async(() => {
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