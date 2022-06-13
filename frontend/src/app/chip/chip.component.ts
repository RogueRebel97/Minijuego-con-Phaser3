import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent implements OnInit {

  @Input() duration!: any
  @Input() color!: any
  @Input() msg!: any

  constructor() { }

  ngOnInit(): void {

  }




}
