import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Episode } from '../../models/episode.model';
import { Character } from '../../models/character.model';

// Notes on getting data:
// Get all episodes (1 API call)
// Get all planets (7 API calls)
// Get all species (4 API calls)
// Get all character data (9 API calls)
// 21 API calls total. Not the most efficient, but SWAPI is limited in terms of downloading character data per episode
// Other potential routes to avoid this number of API calls per page load:
// - Save data to local storage, so only missing data is fetched.
// - Chunk the character/planets/species API calls by only those that are needed for a particular episode.
  // This would require to first get all character data for an episode chunked by only making an API call for the page that a character will be on, and therefore sticking to a total maximum of 9 API calls.
  // Do the same for planets/species and then build the Character object.
  // This route would minimize the number of API calls per loaded episode.
  // This route assumes that the IDs of characters, planets, and species will be returned on the same page from the API everytime.
// For expediency sake, the following service makes 21 total API calls on the first page load.

@Injectable()
export class SwapiService {
  public dataFetched: boolean = false;
  public allEpisodes: Array<Episode> = [];
  public allSpecies: Object = {}; // allSpecies[URL] = speciesName
  public allPlanets: Object = {}; // allPlanets[URL] = planetName
  public allCharacters: Object = {}; // allCharacters[URL] = Character

  constructor(private http: Http) {};

  private swapiUrl = 'http://swapi.co/api/';

  getAllEpisodes() {
    this.http.get(this.swapiUrl + 'films')
             .map((res) => res.json())
             .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
             .subscribe((res) => {
               res.results.forEach((episode) => {
                  this.allEpisodes[Number(episode.episode_id)] = {
                    episode_id: Number(episode.episode_id),
                    name: episode.title,
                    opening_crawl: episode.opening_crawl,
                    characters: episode.characters
                  }
               });
             }, 
             err => console.log(err), 
             () => {
               console.log('Episodes done!');
             });
  };

  getAllSpecies(page: number = 1) {
    let nextPage = false;
    this.http.get(this.swapiUrl + 'species/?page=' + page)
             .map((res:Response) => res.json())
             .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
             .subscribe((res) => {
               if (res.next) nextPage = true;
               res.results.forEach((species) => {
                 this.allSpecies[species.url] = species.name;
               });
             }, 
             err => console.log(err), 
             () => {
              if (nextPage) {
                this.getAllSpecies(++page)
              } else {
                console.log('Species done!');
                this.getAllPlanets();
              }
             });
  };

  getAllPlanets(page: number = 1) {
    let nextPage = false;
    this.http.get(this.swapiUrl + 'planets/?page=' + page)
             .map((res:Response) => res.json())
             .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
             .subscribe((res) => {
               if (res.next) nextPage = true;
               res.results.forEach((planet) => {
                 this.allPlanets[planet.url] = planet.name;
               });
             }, 
             err => console.log(err), 
             () => {
              if (nextPage) {
                this.getAllPlanets(++page)
              } else {
                console.log('Planets done!');
                this.getAllCharacters();
              }
             });
  };

  getAllCharacters(page: number = 1) {
    let nextPage = false;
    this.http.get(this.swapiUrl + 'people/?page=' + page)
             .map((res:Response) => res.json())
             .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
             .subscribe((res) => {
               if (res.next) nextPage = true;
               res.results.forEach((character) => {
                 this.allCharacters[character.url] = {
                  name: character.name,
                  species: this.allSpecies[character.species],
                  height: character.height,
                  mass: character.mass,
                  birthYear: character.birth_year,
                  gender: character.gender,
                  homeWorld: this.allPlanets[character.homeworld]
                 };
               });
             }, 
             err => console.log(err), 
             () => {
              if (nextPage) {
                this.getAllCharacters(++page)
              } else {
                console.log('Characters done!');
                localStorage.setItem('SWAPIData', JSON.stringify({
                  allEpisodes: this.allEpisodes,
                  allSpecies: this.allSpecies,
                  allPlanets: this.allPlanets,
                  allCharacters: this.allCharacters
                }));
                this.dataFetched = true;
              }
             });
  };

  init() {
    if (localStorage.getItem('SWAPIData')) {
      const data = JSON.parse(localStorage.getItem('SWAPIData'));
      this.allEpisodes = data.allEpisodes;
      this.allSpecies = data.allSpecies;
      this.allPlanets = data.allPlanets;
      this.allCharacters = data.allCharacters;
      this.dataFetched = true;
      console.log('Data restored from localStorage!');
    } else {
      this.getAllEpisodes();
      this.getAllSpecies();
    }
  }
};
