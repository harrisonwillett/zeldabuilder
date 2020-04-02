import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ColorPalettePickerComponent } from './color-palette-picker.component';
import { RgbaColor } from 'src/app/model/rgba-color';

const red: RgbaColor = {
  red: 255,
  green: 0,
  blue: 0,
  alpha: 1
};
const green: RgbaColor = {
  red: 0,
  green: 255,
  blue: 0,
  alpha: 1
};
const blue: RgbaColor = {
  red: 0,
  green: 0,
  blue: 255
};
const gray40: RgbaColor = {
  red: 128,
  green: 128,
  blue: 128,
  alpha: 0.4
};

describe('ColorPalettePickerComponent', () => {
  let component: ColorPalettePickerComponent;
  let fixture: ComponentFixture<ColorPalettePickerComponent>;

  beforeEach(async(() => {
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

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should get a value from rgba', () => {
    component.color = red;
    fixture.detectChanges();

    let input = fixture.debugElement.queryAll(By.css('.color-picker-wrapper input'));
    expect(input[0].nativeNode.value).toBe("rgba(255, 0, 0, 1)");
  });

  fit('should get a value from rgb', () => {
    component.color = blue;
    fixture.detectChanges();

    let input = fixture.debugElement.queryAll(By.css('.color-picker-wrapper input'));
    expect(input[0].nativeNode.value).toBe("rgba(0, 0, 255, 1)");
  });

  fit('should create a valid style from rgba object', () => {
    component.color = blue;
    fixture.detectChanges();

    let input = fixture.debugElement.queryAll(By.css('.color-picker-wrapper input'));

    expect(input[0].nativeNode.style.color).toBe("rgb(255, 255, 0)");
    expect(input[0].nativeNode.style.backgroundColor).toBe("rgb(0, 0, 255)");

    component.color = gray40;
    fixture.detectChanges();

    input = fixture.debugElement.queryAll(By.css('.color-picker-wrapper input'));

    // console.log({ style: input[0].nativeNode.style });
    expect(input[0].nativeNode.style.color).toBe("rgb(0, 0, 0)");
    expect(input[0].nativeNode.style.backgroundColor).toBe("rgba(128, 128, 128, 0.4)");
  });

  fit('should toggle fieldset on input click', () => {
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

  fit('should update rgba object on blur of red channel input', fakeAsync(() => {
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

  fit('should update rgba object on blur of green channel input', fakeAsync(() => {
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

  fit('should update rgba object on blur of blue channel input', fakeAsync(() => {
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

  fit('should update rgba object on blur of alpha channel input', fakeAsync(() => {
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
