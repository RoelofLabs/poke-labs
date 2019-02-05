import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { SortOrder } from './events.service';

export interface PokemonRequestResult {
  name: string;
  url: string;
}

export interface PokemonRequestResultList {
  count: number;
  next: string;
  previous: string;
  results: Array<PokemonRequestResult>;
}

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  public pokemon: BehaviorSubject<Pokemon.Detail[]>;
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(
    private http: HttpClient
  ) {
    this.pokemon = new BehaviorSubject([]);
  }

  public GetPokemon(page: number): void {
    const list: Pokemon.Detail[] = [];

    this.GetPokemonRequest(page * 5, 5).pipe(
      tap(result => console.log(result)),
      map(result => result.results),
      tap(pokeData => {

        pokeData.forEach(data => {
          this.http.get<Pokemon.Detail>(data.url).subscribe(detail => {
            list.push(detail);
            this.pokemon.next(list);
          });
        });

      })
    ).subscribe();
  }

  public GetPokemonByName(name: string): Observable<Pokemon.Detail> {

    return Observable.create(observer => {

      this.http.get(`${this.baseUrl}/${name}`).subscribe(
        data => observer.next(data),
        () => observer.next()
      );

    });
  }

  public SortPokemon(list: Pokemon.Detail[], sortOrder: SortOrder) {
    return sortOrder === SortOrder.ASCENDING ? this.SortAscending(list) : this.SortDescending(list);
  }

  private SortAscending(list: Pokemon.Detail[]): Pokemon.Detail[] {
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }

  private SortDescending(list: Pokemon.Detail[]): Pokemon.Detail[] {
    return list.sort((a, b) => a.name.localeCompare(b.name) * -1);
  }

  private GetPokemonRequest(offset: number, limit: number): Observable<PokemonRequestResultList> {
    return this.http.get<PokemonRequestResultList>(`${this.baseUrl}?offset=${offset}&limit=${limit}`);
  }
}
