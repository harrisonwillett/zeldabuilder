import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SliderDirective } from './slider.directive';

@Component({
  template: `
    <div appSlider
    tabindex="0"
    role="slider"
    aria-valuemin="0"
    attr.aria-valuenow="20"
    (valueNowOut)="updateValue($event)"
    aria-valuemax="100"
    aria-orientation="vertical"
    aria-label="Label Value"
    ></div>
  `
})
class SampleSlider { }

describe('SliderDirective', () => {
  let component: SampleSlider;
  let fixture: ComponentFixture<SampleSlider>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleSlider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create an instance', () => {
    const el = new ElementRef(component);
    const directive = new SliderDirective(el);
    expect(directive).toBeTruthy();
  });
});
