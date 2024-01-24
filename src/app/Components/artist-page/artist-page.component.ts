import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';



interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Singer',
    children: [{name: 'Traditional'}, {name: 'Western'}, {name: 'Modern'}],
  },
  {
    name: 'Karaoke',
    children: [{name: 'Traditional'}, {name: 'Western'}, {name: 'Modern'}],
  },
  {
    name: 'Musician',
    children: [{name: 'Traditional'}, {name: 'Western'}, {name: 'Modern'}],
  },
  {
    name: 'Guitarist',
    children: [{name: 'Traditional'}, {name: 'Western'}, {name: 'Modern'}],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
      },
      {
        name: 'Orange',
        children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
      },
    ],
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {

  artists: any[] = [];
  selectedArtist: any = null;
  products: any[] = [];
  // displayedArtists: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private service: ServiceService, private matPaginatorIntl: MatPaginatorIntl,private router: Router) {
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit(): void {
    this.getArtistList();
    this.getProductsList();
  } 

  getArtistList() {
    this.service.getArtistDetails().subscribe({
      next: (res: any) => {
        console.log(res);
        this.artists = res;
        // this.updatePaginator();
      },
      error: (err: any) => {
        console.error('Error:', err);
        alert('Error fetching data. Check the console for details.');
      },
    });
  }

  getProductsList() {
    this.service.getProductDetails().subscribe({
      next: (res: any) => {
        this.products = res;
      },
      error: (err: any) => {
        alert(err);
      }
    });
  }

  navigateToProfile(artist: any) {
    
    this.router.navigate(['/profile', artist.Aid]); 
  }

  // updatePaginator() {
  //   this.paginator.length = this.artists.length;
  //   this.paginator.page.subscribe(() => {
  //     this.updateDisplayedArtists();
  //   });
  //   this.updateDisplayedArtists();
  // }

  // updateDisplayedArtists() {
  //   const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
  //   const endIndex = startIndex + this.paginator.pageSize;
  //   this.displayedArtists = this.artists.slice(startIndex, endIndex);
  // }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

}
