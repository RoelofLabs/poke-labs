import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, fromEvent, MonoTypeOperatorFunction } from 'rxjs';
import { bufferTime, tap, filter, debounceTime } from 'rxjs/operators';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'poke-poke-search',
  templateUrl: './poke-search.component.html',
  styleUrls: ['./poke-search.component.scss']
})
export class PokeSearchComponent implements OnInit {

  @Output()
  public pokemonFound: EventEmitter<Pokemon.Detail> = new EventEmitter();

  public active: boolean;
  public error: boolean;
  public searchValue = '';

  // public InputEvent: Observable<any>;

  constructor(
    private pokeApi: PokeApiService
  ) { }

  ngOnInit() {
    this.active = false;
    this.error = false;

    const searchInput: HTMLInputElement = document.querySelector('.search-input');

    fromEvent(searchInput, 'keyup').pipe(
      // bufferTime(1000),
      // filter(data => data.length > 0),

      debounceTime(1000),
      tap(() => {

        this.error = false;

        this.pokeApi.GetPokemonByName(this.searchValue).subscribe(detail => {
          if (isNullOrUndefined(detail)) {
            this.error = true;
          } else {
            this.pokemonFound.emit(detail);
          }
        });

      })
    ).subscribe();
  }

  Toggle() {
    this.active = !this.active;
  }
}
