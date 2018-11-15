import { Component, HostListener, ElementRef } from '@angular/core';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-search',
  templateUrl: 'search.html'
})
export class SearchComponent {
    private active: boolean = false;
    private provider;
    private searchQuery: string = "";

    private wasInside = false;
  
    @HostListener('document:click', ['$event'])
    clickout(event) {
      if(this.eRef.nativeElement.contains(event.target)) {
        this.active = true;
      } else {
        this.active = false;
      }
    }

    path: any[] = []
    pins: any[] = []
    results: any[] = []

    constructor (private eRef: ElementRef) {
        this.provider = new OpenStreetMapProvider();
    }

    onResultSelected(result)
    {
        console.log(result);
        this.path.push(result);
        this.searchQuery = "";
    }

    async onInput() {
        this.active = true;
        this.results = await this.provider.search({ query: this.searchQuery });
    }
}
