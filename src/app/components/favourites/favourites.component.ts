import { Component, OnInit } from '@angular/core';
import { FavouritesService } from 'src/app/services/favourites.service';
import { Observable } from 'rxjs';
import { EventsService, SortOrder } from 'src/app/services/events.service';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'poke-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  pokemonList: Observable<Pokemon.Detail[]>;

  constructor(
    private favourites: FavouritesService,
    private events: EventsService,
    private pokeApi: PokeApiService
  ) { }

  ngOnInit() {
    this.pokemonList = this.favourites.favouritePokemon.asObservable();

    this.events.SetSorting.subscribe(sortOrder => {
      this.favourites.favouritePokemon.next(
        this.pokeApi.SortPokemon(this.favourites.favouritePokemon.getValue(), sortOrder)
      );
    });
  }

}
