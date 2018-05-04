import { Component, OnInit, ViewChild } from '@angular/core';
import { ColyseusGameService } from '../colyseus.game.service';
import { HttpClient } from '@angular/common/http';

import debounce from 'debounce-decorator';
import { Observable } from 'rxjs/Observable';
import { ArmorClasses, WeaponClasses } from '../../../shared/models/item';

@Component({
  selector: 'app-market-board',
  templateUrl: './market-board.component.html',
  styleUrls: ['./market-board.component.scss']
})
export class MarketBoardComponent implements OnInit {

  @ViewChild('marketBuy')
  public marketBuy;

  @ViewChild('marketSell')
  public marketSell;

  @ViewChild('marketListings')
  public marketListings;

  public activeTab = 'Buy';
  public tabs = ['Buy', 'Sell', 'My Listings'];

  public isLoading: boolean;
  public isError: boolean;
  public buyableItemListings: any[] = [];
  public searchText = '';

  public sortOptions = [
    { name: 'Most Recent',        sort: { 'listingInfo.listedAt': -1 } },
    { name: 'Least Recent',       sort: { 'listingInfo.listedAt': 1 } },
    { name: 'Price: Low to High', sort: { 'listingInfo.price': 1 } },
    { name: 'Price: High to Low', sort: { 'listingInfo.price': -1 } }
  ];

  public filterTags: Array<{ name: string, includedTypes: string[], isIncluded?: boolean }> = [
    { name: 'Armor',          includedTypes: ArmorClasses },
    { name: 'Bottles',        includedTypes: ['Bottle'] },
    { name: 'Food',           includedTypes: ['Food'] },
    { name: 'Gems',           includedTypes: ['Gem'] },
    { name: 'Misc',           includedTypes: ['Box', 'Book', 'Skull', 'Key'] },
    { name: 'Reagents',       includedTypes: ['Flower', 'Rock'] },
    { name: 'Scrolls',        includedTypes: ['Scroll'] },
    { name: 'Traps',          includedTypes: ['Trap'] },
    { name: 'Weapons',        includedTypes: WeaponClasses }
  ];

  public currentSort: any;

  get player() {
    return this.colyseusGame.character;
  }

  get currentTab() {
    switch(this.activeTab) {
      case 'Buy':           return this.marketBuy;
      case 'Sell':          return this.marketSell;
      case 'My Listings':   return this.marketListings;
    }
  }

  constructor(public colyseusGame: ColyseusGameService, private http: HttpClient) { }

  ngOnInit() {
    this.switchTab('Buy');
  }

  switchTab(newTab) {
    this.activeTab = newTab;

    if(newTab === 'Buy') {
      this.changeSort(this.sortOptions[0].sort);
      this.loadBuyOptions();
    }
  }

  public changeSort(sort) {
    this.currentSort = sort;
    this.loadBuyOptions();
  }

  public toggleFilter(filter) {
    filter.isIncluded = !filter.isIncluded;
    this.loadBuyOptions();
  }

  @debounce(500)
  public changeSearchText() {
    this.loadBuyOptions();
  }

  private loadBuyOptions() {

    this.isError = false;
    this.isLoading = true;

    const searchParams: any = { search: {} };

    if(this.searchText) {
      searchParams.search.itemId = this.searchText;
    }

    if(this.currentSort) {
      searchParams.sort = this.currentSort;
    }

    const includedFilters = this.filterTags.filter(x => x.isIncluded);
    if(includedFilters.length > 0) {
      searchParams.filter = includedFilters.reduce((prev, cur) => {
        prev.push(...cur.includedTypes);
        return prev;
      }, []);
    }

    this.http.post('api/market', searchParams)
      .catch(() => {
        this.isLoading = false;
        this.isError = true;
        this.buyableItemListings = [];
        return Observable.empty();
      })
      .subscribe((data: any[]) => {
        this.isLoading = false;
        this.buyableItemListings = data;
      });
  }

  public starTextFor(itemListing) {
    const quality = itemListing.itemInfo.quality;
    return quality - 2 > 0 ? Array(quality - 2).fill('★').join('') : '';
  }

  list() {
    this.colyseusGame.sendRawCommand('listmarketitem', this.colyseusGame.showMarketBoard.uuid);
  }
}
