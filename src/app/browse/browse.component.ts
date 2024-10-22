import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'


@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent implements OnInit{
  sort: string | null = null;
  limit: number | null = null;
  constructor(private route: ActivatedRoute){
  }

  ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.sort =params['sort']
        this.limit = params['limit']
      })

      console.log(this.sort)
  }
}
