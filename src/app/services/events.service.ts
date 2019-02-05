import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum SortOrder {
  ASCENDING,
  DESCENDING
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private SortAscending: BehaviorSubject<boolean>;

  public ActivePokemon: EventEmitter<Pokemon.Detail> = new EventEmitter();
  public SetSorting: EventEmitter<SortOrder> = new EventEmitter();

  constructor() {
    this.SortAscending = new BehaviorSubject(false);
  }
}
