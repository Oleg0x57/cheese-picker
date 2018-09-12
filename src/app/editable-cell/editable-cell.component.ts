import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-editable-cell',
  templateUrl: './editable-cell.component.html',
  styleUrls: ['./editable-cell.component.css']
})
export class EditableCellComponent implements OnInit, OnChanges {

  @Input() cellValue: any;
  @Output() edited = new EventEmitter<any>();
  @Input() isEdit: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.isEdit);
  }

  edit() {
    if (this.isEdit) {
      this.onFinishEdit();
    }
    this.isEdit = !this.isEdit;
  }

  onFinishEdit() {
    console.log(this.cellValue);
    this.edited.emit(this.cellValue);
  }

}
