export interface SearchRequest {
    searchTypes: SearchType[];
}

export interface SearchType {
    title: String;
    class: String;
    icon: String;
}
