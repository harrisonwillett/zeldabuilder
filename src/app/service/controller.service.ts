import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ControllerService {
  public activeButtons: Observable<string[]> = of([]);

  setButtons(buttons: string[]) {
    this.activeButtons = of(buttons);
    this.activeButtons.forEach((str) => {
      console.log({"controller.service.ts setButtons()": str});
    });
  }

  getButtons(): Observable<string[]> {
    this.activeButtons.forEach((str) => {
      console.log({"controller.service.ts getButtons()": str});
    });
    return this.activeButtons;
  }

}
