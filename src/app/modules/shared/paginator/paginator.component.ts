import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import Pagination from '../../../models/Pagination';

@Component({
  selector: 'app-paginator',
  imports: [MatPaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
})
export class PaginatorComponent {
  @Input() pagination = new Pagination(0, 1, 25, [5, 10, 25, 100]);
  @Output() onPage = new EventEmitter<PageEvent>();

  paginate(event: PageEvent) {
    this.onPage.emit(event);
  }
}
