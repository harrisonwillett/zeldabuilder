import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabNavigationItemComponent } from './tab-navigation-item.component';

describe('TabNavigationItemComponent', () => {
  let component: TabNavigationItemComponent;
  let fixture: ComponentFixture<TabNavigationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabNavigationItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabNavigationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
