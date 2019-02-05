import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { bulbasaur } from 'src/app/bulbasaur';
import { EventsService, SortOrder } from 'src/app/services/events.service';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'poke-grid',
  templateUrl: './poke-grid.component.html',
  styleUrls: ['./poke-grid.component.scss']
})
export class PokeGridComponent implements OnInit {

  @Input()
  public pokemonList: Pokemon.Detail[];

  @Output()
  public selected: EventEmitter<Pokemon.Detail> = new EventEmitter();

  constructor(
    private pokeApi: PokeApiService,
    private events: EventsService
  ) { }

  ngOnInit() {
    this.events.SetSorting.subscribe(sortOrder => {
      this.pokemonList = this.pokeApi.SortPokemon(this.pokemonList, sortOrder);
    });
  }

  Selected(pokemon: Pokemon.Detail) {
    this.selected.emit(pokemon);
  }

  Filter(tags: string[]) {
    if (tags.length === 0) {
      this.pokemonList = this.pokeApi.pokemon.getValue();
    } else {
      this.pokemonList = this.pokeApi.pokemon.getValue().filter(pokemon => {
        return pokemon.types.find(type => {
          return tags.indexOf(type.type.name) >= 0;
        });
      });
    }
  }
}
