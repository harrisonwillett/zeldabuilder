import { ComponentFixture, TestBed, tick, fakeAsync, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ColorPalettePickerComponent } from './color-palette-picker.component';
import { RgbaColor } from 'src/app/model/rgba-color';

const red: RgbaColor = new RgbaColor(
  255,
  0,
  0,
  1
);
const green: RgbaColor = new RgbaColor(
  0,
  255,
  0,
  1
);
const blue: RgbaColor = new RgbaColor(
  0,
  0,
  255
);
const gray40: RgbaColor = new RgbaColor(
  128,
  128,
  128,
  0.4
);

describe('ColorPalettePickerComponent', () => {
  let component: ColorPalettePickerComponent;
  let fixture: ComponentFixture<ColorPalettePickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ColorPalettePickerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPalettePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get a value from rgba', () => {
    component.color = red;
    fixture.detectChanges();

    let input = fixture.debugElement.queryAll(By.css('.color-picker-wrapper input'));
    expect(input[0].nativeNode.value).toBe("rgba(255, 0, 0, 1)");
  });

  it('should get a value from rgb', () => {
    component.color = blue;
    fixture.detectChanges();

    let input = fixture.debugElement.queryAll(By.css('.color-picker-wrapper input'));
    expect(input[0].nativeNode.value).toBe("rgba(0, 0, 255, 1)");
  });

  it('should create a valid style from rgba object', () => {
    component.color = blue;
    fixture.detectChanges();

    let input = fixture.debugElement.queryAll(By.css('.color-picker-wrapper input'));

    expect(input[0].nativeNode.style.color).toBe("rgb(255, 255, 0)");
    expect(input[0].nativeNode.style.backgroundColor).toBe("rgb(0, 0, 255)");

    component.color = gray40;
    fixture.detectChanges();

    input = fixture.debugElement.queryAll(By.css('.color-picker-wrapper input'));

    expect(input[0].nativeNode.style.color).toBe("rgb(0, 0, 0)");
    expect(input[0].nativeNode.style.backgroundColor).toBe("rgba(128, 128, 128, 0.4)");
  });

  it('should toggle fieldset on input click', () => {
    component.color = blue;
    fixture.detectChanges();
    let input = fixture.debugElement.queryAll(By.css('.color-picker-wrapper input'));
    let fieldsetWrapper = fixture.debugElement.queryAll(By.css('.color-picker-wrapper ~ div'));

    expect(fieldsetWrapper[0].nativeElement.hidden).toBeTrue();

    input[0].nativeElement.click();

    expect(fieldsetWrapper[0].nativeElement.hidden).toBeFalse();

    input[0].nativeElement.click();

    expect(fieldsetWrapper[0].nativeElement.hidden).toBeTrue();
  });

  it('should update rgba object on blur of red channel input', fakeAsync(() => {
    fixture.ngZone.run(() => {
      component.color = { ...gray40 };
      fixture.detectChanges();
      let readonlyInput = fixture.debugElement.queryAll(By.css('.color-picker-wrapper input'));
      let redInput = fixture.debugElement.queryAll(By.css('input[type="number"]'));
      redInput[0].nativeElement.value = 200;
      redInput[0].nativeElement.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(readonlyInput[0].nativeElement.value).toBe('rgba(200, 128, 128, 0.4)');
      expect(component.color.red.toString()).toBe('200');
    });
  }));

  it('should update rgba object on blur of green channel input', fakeAsync(() => {
    fixture.ngZone.run(() => {
      component.color = { ...gray40 };
      fixture.detectChanges();
      let readonlyInput = fixture.debugElement.queryAll(By.css('.color-picker-wrapper input'));
      let greenInput = fixture.debugElement.queryAll(By.css('input[type="number"]'));
      greenInput[1].nativeElement.value = 200;
      greenInput[1].nativeElement.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(readonlyInput[0].nativeElement.value).toBe('rgba(128, 200, 128, 0.4)');
      expect(component.color.green.toString()).toBe('200');
    });
  }));

  it('should update rgba object on blur of blue channel input', fakeAsync(() => {
    fixture.ngZone.run(() => {
      component.color = { ...gray40 };
      fixture.detectChanges();
      let readonlyInput = fixture.debugElement.queryAll(By.css('.color-picker-wrapper input'));
      let blueInput = fixture.debugElement.queryAll(By.css('input[type="number"]'));
      blueInput[2].nativeElement.value = 200;
      blueInput[2].nativeElement.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(readonlyInput[0].nativeElement.value).toBe('rgba(128, 128, 200, 0.4)');
      expect(component.color.blue.toString()).toBe('200');
    });
  }));

  it('should update rgba object on blur of alpha channel input', fakeAsync(() => {
    fixture.ngZone.run(() => {
      component.color = { ...gray40 };
      fixture.detectChanges();
      let readonlyInput = fixture.debugElement.queryAll(By.css('.color-picker-wrapper input'));
      let alphaInput = fixture.debugElement.queryAll(By.css('input[type="number"]'));
      alphaInput[3].nativeElement.value = .2;
      alphaInput[3].nativeElement.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(readonlyInput[0].nativeElement.value).toBe('rgba(128, 128, 128, 0.2)');
      expect(component.color.alpha.toString()).toBe('0.2');
    });
  }));
});
