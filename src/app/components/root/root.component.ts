import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { SwapiService } from '../../services/swapi/swapi.service';
import { Episode } from '../../models/episode.model';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {
  public currentEpisode: number = 1;
  public currentCharacters: Array<Character> = [];
  public currentFilter = {type: null, direction: null};
  
  constructor(
    private swapi:SwapiService
  ) {}

  ngOnInit() {
    this.swapi.init();
    while (!this.swapi.dataFetched) {} // Horrible way to handle async, but I am still learning observable best practices.
    this.handleEpisodeChange(1);
  }

  handleEpisodeChange(episode) {
    this.currentEpisode = episode;
    this.currentCharacters = this.swapi.allEpisodes[episode].characters.map(url => this.swapi.allCharacters[url]);
    this.currentFilter = {type: null, direction: null};
  }

  handleFilterChange(filter) {
    this.currentFilter = this.currentFilter.type === filter && this.currentFilter.direction === 'asc' ?
                         {type: filter, direction: 'desc'} :
                         {type: filter, direction: 'asc'}
    this.currentCharacters.sort((a, b) => {
      if (this.currentFilter.direction === 'asc') {
        if (a[filter] > b[filter]) {
          return 1;
        } else {
          return -1;
        }
      } else {
        if (a[filter] > b[filter]) {
          return -1;
        } else {
          return 1;
        }
      }
    });
  }
}
