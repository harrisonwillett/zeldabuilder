import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";

import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "rgbaString" })
class MockPipe implements PipeTransform {
  transform(obj: any): any {
    return obj;
  }
}

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, MockPipe]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should have a HelloWorld function", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.helloWorld).toBeDefined();
  });

  it("should have a HelloWorld function that returns void", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.helloWorld()).toBeUndefined();
  });
});
