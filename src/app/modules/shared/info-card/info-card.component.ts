import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BadgeComponent } from '../badge/badge.component';

type CardSize = 'sm' | 'md' | 'lg';
type CardType = 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
type CardShade = 'default' | 'light';

@Component({
  selector: 'app-info-card',
  imports: [CommonModule, BadgeComponent],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css',
})
export class InfoCardComponent {
  @Input() size: CardSize = 'sm';
  @Input() type: CardType = 'primary';
  @Input() shade: CardShade = 'default';
  @Input() badge: string = '';
  @Input() subDetail: string = ''; // detail on the right side of badge
  @Input() title: string = 'Youve got a cashback';
  @Input() descriptions: string[] = [
    'Youve received a P30 cashback for buying load. Go to the Vouchers  section and tap Claim to redeem.',
    'Keep buying load to for unli cash back',
  ];
  @Input() infomini: string = 'n/a';
  @Input() displayTitle: boolean = false;
}
