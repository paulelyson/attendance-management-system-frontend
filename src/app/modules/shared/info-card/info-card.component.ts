import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BadgeComponent } from '../badge/badge.component';

type CardSize = 'sm' | 'md' | 'lg';
type CardType = 'default' | 'primary' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'app-info-card',
  imports: [CommonModule, BadgeComponent],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css',
})
export class InfoCardComponent {
  @Input() size: CardSize = 'sm';
  @Input() type: CardType = 'primary';
  @Input() badge: string = ''
  @Input() subDetail: string = '' // detail on the right side of badge
  @Input() title: string = '';
  @Input() descriptions: string[] = [];
  @Input() infomini: string = 'n/a';
  @Input() displayTitle: boolean = false;
}
