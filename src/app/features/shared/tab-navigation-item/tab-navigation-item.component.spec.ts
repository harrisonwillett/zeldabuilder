import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes, Router } from '@angular/router';
import { By } from '@angular/platform-browser';

import { TabNavigationItemComponent } from './tab-navigation-item.component';
import { Component } from '@angular/core';

@Component({
  template: ``
})
export class StubPageComponent { }

const routes: Routes = [
  { path: "game", component: StubPageComponent },
  //Sheet Feature
  { path: "sprites", component: StubPageComponent },
  {
    path: "sprites/create-sprite-sheet",
    component: StubPageComponent
  },
  {
    path: "sprites/:sheetId",
    component: StubPageComponent
  },
  //Sprite Feature
  {
    path: "sprites/:sheetId/:spriteId",
    component: StubPageComponent
  },
  //Music Feature
  { path: "music-tracks", component: StubPageComponent },
  { path: "", redirectTo: "/game", pathMatch: "full" }
];

describe('TabNavigationItemComponent', () => {
  let component: TabNavigationItemComponent;
  let fixture: ComponentFixture<TabNavigationItemComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [TabNavigationItemComponent]
    })
      .compileComponents();
    fixture = TestBed.createComponent(TabNavigationItemComponent);
    component = fixture.componentInstance;
    component.tab = {
      title: "Edit Sprites",
      routerLink: "/sprites",
      routerLinkActiveOptions: { exact: false }
    };
    router = TestBed.get(Router);
    fixture.detectChanges();
  }));

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should have a "string" for a title', () => {
    expect(typeof component.tab.title).toBe('string');
  });

  fit('should have active link styles when page matches tab', fakeAsync(() => {
    fixture.ngZone.run(() => {
      router.navigate(['sprites']);
      tick();
      fixture.detectChanges();
      let link = fixture.debugElement.queryAll(By.css('.nav-link'));
      expect(link[0].nativeNode.classList.value).toBe("nav-link active");
    });
  }));

  fit('should NOT have active link styles when page does NOT match tab', fakeAsync(() => {
    fixture.ngZone.run(() => {
      router.navigate(['game']);
      tick();
      fixture.detectChanges();
      let link = fixture.debugElement.queryAll(By.css('.nav-link'));
      expect(link[0].nativeNode.classList.value).toBe("nav-link");
    });
  }));
});
