export enum ProductType {
    selectedDeleted,
    toSelectDeleted,
    selected,
    toSelect,
    selectedInSelection,
    toSelectInSelection,
}

export interface Product {
    id?: string;
    name?: string;
    description?: string;
    amount?: string;
    situation: ProductType
}