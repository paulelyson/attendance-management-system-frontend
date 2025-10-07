import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonType = 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
type ButtonShade = 'default' | 'light';

@Component({
  selector: 'app-button',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() size: ButtonSize = 'sm';
  @Input() type: ButtonType = 'default';
  @Input() shade: ButtonShade = 'default';
  @Output() btnclicked: EventEmitter<string> = new EventEmitter<string>();

  onClicked(): void {
    this.btnclicked.emit();
  }
}
