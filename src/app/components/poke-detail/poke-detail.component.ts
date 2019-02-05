import { Component, OnInit, Input } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.scss']
})
export class PokeDetailComponent implements OnInit {

  @Input()
  public pokemon: Pokemon.Detail = null;

  constructor(
    private events: EventsService
  ) { }

  ngOnInit() {
    this.events.ActivePokemon.subscribe(data => {
      this.pokemon = data;
    });
  }

  GetMainType(): string {
    return this.pokemon.types.find(type => type.slot === 1).type.name;
  }

  GetStats(): {value: number, name: string}[] {

    let stats;
    let value;
    let name;

    value = this.pokemon.weight;
    name = 'weight';
    const weight = {
      value,
      name
    };

    const height = {
      value: this.pokemon.height,
      name: 'height'
    };

    const otherStats = this.pokemon.stats.map(stat => ({value: stat.base_stat, name: stat.stat.name}));

    stats = [weight, height, ...otherStats];
    return stats;
  }

}
