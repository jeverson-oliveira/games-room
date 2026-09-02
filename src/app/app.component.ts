import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'games-room';

  ngOnInit() {
    const theme = localStorage.getItem('games-room:theme');
    if (theme) document.documentElement.setAttribute('data-theme', theme);
  }
}
