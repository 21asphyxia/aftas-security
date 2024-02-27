import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() page: number = 0;
  @Input() size: number = 10;
  @Input() count: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  onNextClick(number: number) {
    this.pageChange.emit(this.page + 1);
    this.page = this.page + 1;
  }

  onPreviousClick(number: number) {
    if (this.page !== 0) {
      this.pageChange.emit(this.page - 1);
      this.page = this.page - 1;
    }
  }
}
