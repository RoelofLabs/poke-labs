import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  favouritePokemon: BehaviorSubject<Pokemon.Detail[]>;

  constructor() {
    this.favouritePokemon = new BehaviorSubject([]);
  }

  Add(pokemon: Pokemon.Detail) {
    const list = this.favouritePokemon.getValue();
    list.push(pokemon);
    this.favouritePokemon.next(list);
  }
}
