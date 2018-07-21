export interface HeaderRequest {
    title: string;
    searchTypes: SearchType[];
}

export interface SearchType {
    title: String;
    class: String;
    icon: String;
}
