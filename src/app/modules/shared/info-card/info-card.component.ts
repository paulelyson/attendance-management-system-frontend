import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-card',
  imports: [NgIf],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css'
})
export class InfoCardComponent {
 @Input() title: string = ''
 @Input() description: string = ''
 @Input() infomini: string = 'n/a'
 @Input() displayTitle: boolean = false;
}
