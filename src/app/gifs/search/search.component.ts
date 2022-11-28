import { Component, ElementRef, ViewChild } from '@angular/core';

import { GifsService } from './../service/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  search() {
    const txtValue = this.txtSearch.nativeElement.value;

    if (txtValue.trim().length === 0) return;

    this.gifsService.searchGifs(txtValue);
    this.txtSearch.nativeElement.value = '';
  }
}
