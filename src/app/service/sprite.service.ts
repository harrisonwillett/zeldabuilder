import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { MessageService } from "./message.service";
import { Spritesheet } from "../model/spritesheet";

@Injectable({
  providedIn: "root"
})
export class SpriteService {
  private sheetUrl = "api/sheets";

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(private http: HttpClient, private messageService: MessageService) {}

  /** GET heroes from the server */
  getSheets(): Observable<Spritesheet[]> {
    this.messageService.add("Sprite Service: Loaded Sprites");
    return this.http.get<Spritesheet[]>(this.sheetUrl).pipe(
      tap(_ => this.log("fetched sheets")),
      catchError(this.handleError<Spritesheet[]>("getSheets", []))
    );
  }

  /** DELETE: delete the Spritesheet from the server */
  deleteSheet(sheet: Spritesheet | string): Observable<Spritesheet> {
    const id = typeof sheet === "string" ? sheet : sheet.id;
    const url = `${this.sheetUrl}/${id}`;
    this.messageService.add(`Sprite Service: Deleted a sheet of sprites with the id="${id}".`);
    return this.http.delete<Spritesheet>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted sheet id=${id}`)),
      catchError(this.handleError<Spritesheet>("deleteSheet"))
    );
  }

  /** POST: add a new Spritesheet to the server */
  addSheet(sheet: Spritesheet): Observable<Spritesheet> {
    this.messageService.add(`Sprite Service: Added a sheet of sprites.`);
    return this.http
      .post<Spritesheet>(this.sheetUrl, sheet, this.httpOptions)
      .pipe(
        tap((newSheet: Spritesheet) =>
          this.log(`added sheet w/ id=${newSheet.id}`)
        ),
        catchError(this.handleError<Spritesheet>("addSpritesheet"))
      );
  }

  /** PUT: update the Spritesheet on the server */
  updateSheet(sheet: Spritesheet): Observable<any> {
    this.messageService.add(`Sprite Service: Updated a sheet of sprites with the id="${sheet.id}".`);
    return this.http.put(this.sheetUrl, sheet, this.httpOptions).pipe(
      tap(_ => this.log(`updated sheet id=${sheet.id}`)),
      catchError(this.handleError<any>("updateSheet"))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // console.log({
    //   SpriteServiceMessage: message
    // });
  }
}
