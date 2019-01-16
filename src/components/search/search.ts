import { Component, Output, EventEmitter } from '@angular/core';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

@Component({
  selector: 'app-search',
  templateUrl: 'search.html'
})
export class SearchComponent {
    private provider;
    private searchQuery: string = "";

    @Output() getPathUpdate = new EventEmitter<any[]>();

    path: any[] = []
    pins: any[] = []
    results: any[] = []

    constructor () {
        this.provider = new OpenStreetMapProvider();  
    }

    onResultSelected(result)
    {
        console.log("should update");
        this.path.push(result);
        this.searchQuery = "";
        this.getPathUpdate.emit(this.path);
    }

    async onInput() {
        this.results = await this.provider.search({ query: this.searchQuery });
        //console.log(this.results);
    }
}
