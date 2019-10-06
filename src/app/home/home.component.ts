import { Component, OnInit, Optional, Inject, PLATFORM_ID } from '@angular/core';
import { APP_BASE_HREF, isPlatformBrowser} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  URL: string;
  posts: any;

  constructor(private http: HttpClient,
    @Optional() @Inject(APP_BASE_HREF) origin: string,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.URL = `${origin ? environment.SERVER_URL : '/api'}/posts`;
  }

  ngOnInit() {
    const platform = isPlatformBrowser(this.platformId) ?
    'in the browser' : 'on the server';

    console.log('called Home', platform, (new Date()).toString());
    this.http.get(this.URL)
      .subscribe(response => {
        this.posts = response;
      })
  }

}
