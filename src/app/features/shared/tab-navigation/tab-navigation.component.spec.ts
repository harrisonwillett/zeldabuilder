import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TabNavigationComponent } from "./tab-navigation.component";

describe("TabNavigationComponent", () => {
  let component: TabNavigationComponent;
  let fixture: ComponentFixture<TabNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabNavigationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
