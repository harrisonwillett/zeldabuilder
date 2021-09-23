import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { SpriteService } from 'src/app/service/sprite.service';

import { SpriteSheetCreateComponent } from './sprite-sheet-create.component';

describe('SpriteSheetCreateComponent', () => {
  let component: SpriteSheetCreateComponent;
  let fixture: ComponentFixture<SpriteSheetCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SpriteSheetCreateComponent ],
      providers: [ 
        SpriteService,
        { provide: ActivatedRoute, useValue: {
          params: of({sheetId: 1})
        } }
      ]
    })
    fixture = TestBed.createComponent(SpriteSheetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
