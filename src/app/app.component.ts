import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokeApiService } from './services/poke-api.service';
import { Observable } from 'rxjs';
import { EventsService, SortOrder } from './services/events.service';

@Component({
  selector: 'poke-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pokedex';

  private sortOrder: SortOrder;

  constructor(
    private router: Router,
    private events: EventsService
  ) {}

  ngOnInit() {
    this.sortOrder = SortOrder.ASCENDING;
  }

  FoundPokemon(pokemon: Pokemon.Detail) {
    this.router.navigateByUrl('/pokedex').then(() => {
      setTimeout(() => this.events.ActivePokemon.emit(pokemon), 60);
    });
  }

  ToggleSorting() {
    this.sortOrder = this.sortOrder === SortOrder.ASCENDING ? SortOrder.DESCENDING : SortOrder.ASCENDING;
    this.events.SetSorting.emit(this.sortOrder);
  }
}
