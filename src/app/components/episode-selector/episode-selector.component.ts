import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-episode-selector',
  templateUrl: './episode-selector.component.html',
  styleUrls: ['./episode-selector.component.css']
})
export class EpisodeSelectorComponent {
  @Input() currentEpisode;
  @Output() onChangeEpisode = new EventEmitter;
}
