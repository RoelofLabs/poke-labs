import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PokeGridComponent } from './components/poke-grid/poke-grid.component';
import { PokeCellComponent } from './components/poke-cell/poke-cell.component';
import { PokeDetailComponent } from './components/poke-detail/poke-detail.component';
import { PokeSearchComponent } from './components/poke-search/poke-search.component';
import { AppRoutingModule } from './app-routing.module';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { SortingPipe } from './pipes/sorting.pipe';
import { DrawerMenuComponent } from './components/drawer-menu/drawer-menu.component';
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    PokeGridComponent,
    PokeCellComponent,
    PokeDetailComponent,
    PokeSearchComponent,
    FavouritesComponent,
    PokedexComponent,
    SortingPipe,
    DrawerMenuComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
