import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SpriteService } from 'src/app/service/sprite.service';
import { SpriteDetailComponent } from './sprite-detail.component';

describe('SpriteDetailComponent', () => {
  let component: SpriteDetailComponent;
  let fixture: ComponentFixture<SpriteDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SpriteDetailComponent ],
      providers: [ 
        SpriteService,
        { provide: ActivatedRoute, useValue: {
          params: of({sheetId: 1})
        } }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(SpriteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
