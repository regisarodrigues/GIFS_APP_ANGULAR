import { Component } from '@angular/core';

import { GifsService } from './../../gifs/service/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  constructor(private gifsService: GifsService) {}

  get historic() {
    return this.gifsService.historic;
  }

  search(query: string) {
    this.gifsService.searchGifs(query);
  }
}
