import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-order-user-name',
  templateUrl: './order-user-name.component.html',
  styleUrls: ['./order-user-name.component.scss']
})
export class OrderUserNameComponent{
  @Input() public isHidden: boolean;
  @Input() public name: string;
  @Output() public eventEmitter= new  EventEmitter<void>();

  public emitEvent(): void{
    this.eventEmitter.emit();
  }
}
