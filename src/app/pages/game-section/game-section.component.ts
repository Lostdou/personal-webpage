import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../../env/environment';
import { CommonModule } from '@angular/common';
import { SteamService } from '../../services/steam.service';

@Component({
  selector: 'app-game-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-section.component.html',
  styleUrls: ['./game-section.component.css']
})
export class GameSectionComponent implements OnInit {
  games: any[] = [];

  constructor(private http: HttpClient, private steamSv: SteamService) {}

  ngOnInit(): void {

    this.steamSv.getAchievements().subscribe({next: (res: any) => {{
        console.log(res);
        this.games = res;
      }}
    });
  }
}