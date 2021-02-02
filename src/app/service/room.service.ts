import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { MessageService } from "./message.service";
import { Spritesheet } from "../model/spritesheet";

@Injectable({
  providedIn: "root"
})
export class RoomService {
  private roomUrl = "api/room";

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(private http: HttpClient, private messageService: MessageService) {}

  /** GET heroes from the server */
  getRoom(id: number): Observable<Spritesheet[]> {
    const url = `${this.roomUrl}/${id}`;
    this.messageService.add("Sprite Service: Loaded Sprites");
    return this.http.get<Spritesheet[]>(url, this.httpOptions).pipe(
      tap(_ => this.log("fetched room")),
      catchError(this.handleError<Spritesheet[]>("getRoom", []))
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
    console.log({
      SpriteServiceMessage: message
    });
  }
}
