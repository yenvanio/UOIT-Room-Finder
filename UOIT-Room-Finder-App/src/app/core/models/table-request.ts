/** Possible values for alignment. */
export type Alignment = 'left' | 'center' | 'right';

/**
 * Data sent to the Table Summary component.
 */
export interface TableRequest {
  /** Optional. Whether the table is sortable or not. */
  sortable?: boolean;
  /** Whether to select the row when it is clicked. */
  selectOnClick?: boolean;
  /** Optional. Custom height for table in pixels. */
  height?: number;
  /** Theme color */
  theme: string;
  /** List of headers for the table. */
  headers: Header[];
  /** All the data inserted into the table. */
  data: Data[];
}

/**
 * The header object for TableSummaryRequest.
 */
export interface Header {
  /** DetailsHeader name. Should be translatable. */
  name: string;
  /** Key for column. Should match a key in Data. */
  key: string;
  /** Optional. Sets the width for the column. */
  width?: number;
  /** Optional. Sets the alignment for the column header. */
  align?: Alignment;
  /** Optional. Sets the alignment for the column's data. */
  dataAlign?: Alignment;
  /** Optional. Used if the column contains images. */
  image?: ImageInfo;
  /** Optional. If sortable in TableRequest is set to false, this can be set to true to only sort this column. */
  sortable?: boolean;
}

/**
 * Object for the image column
 */
export interface ImageInfo {
  /** The true value that will trigger the trueImage to show. */
  trueValue: boolean;
  /** Reference to the true image. */
  trueImageRef: string;
  /** Reference to the false image. */
  falseImageRef: string;
}

/**
 * Data object. Can contain anything.
 * <key must match with headers.key>: string;
 * <key_color>: string; Text color.
 * <key_weight>: string; Font weight.
 * <key_title>: string; Tooltip.
 * <key_padding>: number; Left padding.
 */
export interface Data {
  clicked?: boolean;
  color?: string;
  [key: string]: any;
}

/**
 * Data that is sent back on cell click.
 */
export interface AllData {
  /** Row data. */
  row: Data;
  /** Cell key. */
  key: string;
  /** Table data. */
  table: Data[];
}
