import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'poke-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output()
  public filter: EventEmitter<string[]> = new EventEmitter();

  tags: string[];

  constructor() { }

  ngOnInit() {
    this.tags = [];
  }

  OnEnter(filter: HTMLInputElement) {
    this.tags.push(filter.value.toLowerCase());
    filter.value = '';

    this.filter.emit(this.tags);
  }

  RemoveTag(tag: string) {

    this.tags = this.tags.filter(tagVal => tagVal !== tag );
    this.filter.emit(this.tags);
  }
}
