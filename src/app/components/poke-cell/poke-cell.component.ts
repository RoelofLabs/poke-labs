import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FavouritesService } from 'src/app/services/favourites.service';

@Component({
  selector: 'poke-cell',
  templateUrl: './poke-cell.component.html',
  styleUrls: ['./poke-cell.component.scss']
})
export class PokeCellComponent implements OnInit {

  @Input()
  public pokemon: Pokemon.Detail;

  @Input()
  public canAddToFavourites = true;

  @Output()
  public selected: EventEmitter<Pokemon.Detail> = new EventEmitter();

  constructor(
    private favourites: FavouritesService
  ) { }

  ngOnInit() {
  }

  Select() {
    this.selected.emit(this.pokemon);
  }

  AddToFavourites() {
    this.favourites.Add(this.pokemon);
  }
}
