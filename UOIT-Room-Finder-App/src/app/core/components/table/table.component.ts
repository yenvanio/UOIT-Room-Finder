import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {AllData, Data, Header, TableRequest} from '../../models/table-request';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {

  /**
   * Emits data to parent component when buttons are clicked
   * @type {EventEmitter<Data>}
   */
  @Output() rowEmitter: EventEmitter<Data> = new EventEmitter<Data>();
  @Output() refreshEmitter: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Default column width (Only used if width is not provided).
   * @type {number}
   */
  private readonly DEFAULT_WIDTH: number = 128;

  /**
   * MatSort reference from template.
   * @type {MatSort}
   */
  @ViewChild(MatSort) sort: MatSort;

  /**
   * All the data passed in to the component.
   * @type {TableSummaryRequest}
   */
  @Input() data: TableRequest;

  /**
   * Used to trigger change detection
   */
  @Input() update: number;

  /**
   * Used to clear coloring on table from parent component.
   */
  @Input() clearColor: number;

  /**
   * Emits data to parent component when a cell is clicked.
   * @type {EventEmitter<AllData>}
   */
  @Output() cellClickEmitter: EventEmitter<AllData> = new EventEmitter<AllData>();

  /**
   * Holds table headers since mat-table only accepts a string[] for headers.
   * @type {string[]}
   */
  headers: string[] = [];

  /**
   * The main data source used for the table.
   * @type {MatTableDataSource<any>}
   */
  dataSource: MatTableDataSource<any>;

  height = 600;

  /**
   * Used to map text-align values to justify-content values
   * @type {{left: string; center: string; right: string}}
   * @private
   */
  private _alignmentMapping = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end'
  };

  /**
   * Constructor.
   */
  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data.data);
    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => typeof data[sortHeaderId] === 'string' ?
      data[sortHeaderId].toLocaleLowerCase() : data[sortHeaderId];
    this.data.headers.push({key: '_spacer', name: ''});
    this.data.headers.forEach(header => this.headers.push(header.key));
  }

  /**
   * Detect changes.
   * Updates filtering when filter text is changed and updates data when an update is triggered
   * Clears coloring from table if clearColor is changed
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges) {
    // Only check the filter if it is not the first change trigger
    if (changes.filter && !changes.filter.firstChange) {
      let filter = changes.filter.currentValue.trim();
      filter = filter.toLowerCase();
      this.dataSource.filter = filter;
    } else if (changes.update && !changes.update.firstChange) {
      this.dataSource.data = this.data.data;
    } else if (changes.clearColor && !changes.clearColor.firstChange) {
      this.data.data.forEach(r => r.clicked = false);
    }
  }

  /**
   * Set the sorting after the view is initialized.
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /**
   * Emits row data to parent component on row click.
   * @param {Data} row
   */
  rowClick(row: Data) {
    this.rowEmitter.emit(row);
  }

  /**
   * Emits to parent component so table can be refreshed
   */
  refreshClick() {
    this.refreshEmitter.emit();
  }

  /**
   * Checks column type.
   * @param {Header} header
   * @returns {string}
   */
  getType(header: Header): string {
    if (header.image) {
      return 'image';
    } else {
      return 'none';
    }
  }

  /**
   * Retrieves cell width.
   * @param {Header} header
   * @returns {string}
   */
  getWidth(header: Header): string {
    if (header.key === '_spacer') {
      return '100%';
    }

    return (header.width ? header.width : this.DEFAULT_WIDTH) + 'px';
  }

  /**
   * Calculates cell width taking into account left padding.
   * @param {Data} item
   * @param {Header} header
   * @returns {string}
   */
  getWidthWithPadding(item: Data, header: Header): string {
    const padding = item[header.key + '_padding'] === undefined ? 0 : parseInt(item[header.key + '_padding'], 10);

    return (header.width ? header.width : this.DEFAULT_WIDTH) - padding + 'px';
  }

  /**
   * Gets left padding for cell.
   * @param {Data} item
   * @param {Header} header
   * @returns {string}
   */
  getPadding(item: Data, header: Header): string {
    return item[header.key + '_padding'] + 'px';
  }

  /**
   * Gets alignment for data
   * @param {Header} header
   * @returns {string}
   */
  getAlign(header: Header): string {
    return header.dataAlign || header.align;
  }

  /**
   * Gets alignment for header
   * @param {Header} header
   * @returns {string}
   */
  getHeaderAlignment(header: Header): string {
    if (this.data.sortable || header.sortable) {
      return this._alignmentMapping[header.align];
    }

    return header.align;
  }

  /**
   * Gets tooltip for cell.
   * @param {Data} item
   * @param {string} key
   * @returns {string}
   */
  getTitle(item: Data, key: string): string {
    return item[key + '_title'] ? item[key + '_title'] : '';
  }

  /**
   * Gets the special tooltip for a cell.
   * @param {Data} item
   * @param {string} key
   * @returns {string}
   */
  getSpecialTooltip(item: Data, key: string): string {
    return item[key + '_tooltip'] ? item[key + '_tooltip'] : '';
  }

  /**
   * Gets font weight for cell.
   * @param {Data} item
   * @param {Header} header
   * @returns {string}
   */
  getFontWeight(item: Data, header: Header): string {
    return item[header.key + '_weight'];
  }

  /**
   * Gets the image for the cell depending on the value.
   * @param {Data} item
   * @param {Header} header
   * @returns {string}
   */
  getImage(item: Data, header: Header): string {
    return item[header.key] === header.image.trueValue ? header.image.trueImageRef : header.image.falseImageRef;
  }

  /**
   * Checks if a column is sortable.
   * @param {boolean} globalSort
   * @param {Header} header
   * @returns {boolean}
   */
  getSortable(globalSort: boolean, header: Header) {
    if (header.key === '_spacer') {
      return false;
    }

    return globalSort || header.sortable;
  }

  /**
   * Gets text color for a cell.
   * @param {Data} item
   * @param {Header} header
   * @returns {string}
   */
  getColor(item: Data, header: Header): string {
    return item[header.key + '_color'];
  }

  /**
   * Colors the row on click if enabled.
   * @param {Data} item
   * @returns {string}
   */
  markOnClick(item: Data): string {
    return item.clicked && this.data.selectOnClick ? 'row-click-' + this.data.theme : '';
  }
  /** Returns custom table height. */
  getHeight() { return this.data.offsetHeight ? (this.height - this.data.offsetHeight) + 'px' : this.height + 'px'; }

}

