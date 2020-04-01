import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoComponent } from './logo.component';
import { RgbaStringPipe } from 'src/app/pipe/rgba-string.pipe';
import { RgbaColor } from 'src/app/model/rgba-color';
import { map } from 'rxjs/operators';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LogoComponent,
        RgbaStringPipe
      ]
    });
    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should have a color palette with three RGB colors', () => {
    expect(component.colorPalette.length).toBe(3);
    component.colorPalette.forEach((value: RgbaColor, index: number) => {
      expect(value.red).toBeLessThan(256);
      expect(value.red).toBeGreaterThanOrEqual(0);
      expect(value.green).toBeLessThan(256);
      expect(value.green).toBeGreaterThanOrEqual(0);
      expect(value.blue).toBeLessThan(256);
      expect(value.blue).toBeGreaterThanOrEqual(0);
    })
  });


});
