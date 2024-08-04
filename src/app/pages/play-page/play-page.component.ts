import { Component, OnInit } from '@angular/core';
import { PokerService } from '../../services/poker.service';
import { PokerTable } from '../../models/PokerTable';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-play-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './play-page.component.html',
  styleUrl: './play-page.component.scss',
  providers: [PokerService]
})
export class PlayPageComponent implements OnInit {
  table: PokerTable;
  constructor(private pokerService: PokerService) {
    pokerService.init();
    this.table = pokerService.getGameState();
  }

  ngOnInit(): void {

  }

}
