import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { isNullOrUndefined } from 'util';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'poke-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  pokemonList: Observable<Pokemon.Detail[]>;
  activePokemon: Pokemon.Detail;

  private page = 0;

  constructor(
    private pokeApi: PokeApiService,
    private events: EventsService
  ) {}

  ngOnInit() {
    this.pokemonList = this.pokeApi.pokemon.asObservable();
    // this.events.ActivePokemon.subscribe(data => {
    //   this.activePokemon = data;
    // });
  }

  RequestPokemon() {
    this.pokeApi.GetPokemon(this.page);
  }

  Previous() {
    this.page--;
    if (this.page < 0) {
      this.page = 0;
    } else {
      this.RequestPokemon();
    }
  }

  Next() {
    this.page++;
    this.RequestPokemon();
  }
}
