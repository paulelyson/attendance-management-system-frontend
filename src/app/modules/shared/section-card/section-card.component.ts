import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
type CardSize = 'sm' | 'md' | 'lg';
type CardType = 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
type CardShade = 'default' | 'light';

@Component({
  selector: 'app-section-card',
  imports: [CommonModule, MatIconModule],
  templateUrl: './section-card.component.html',
  styleUrl: './section-card.component.css',
})
export class SectionCardComponent {
  @Input() size: CardSize = 'sm';
  @Input() type: CardType = 'primary';
  @Input() shade: CardShade = 'default';
  @Input() title: string = 'Your Schedule Today';
  @Input() descriptions: string[] = [
    'Time In: 7:30 AM',
    'Time Out: 5:30 PM',
    'Lunch Break: 12:00 PM - 01:00 PM',
  ];
}
