import { Product, ProductType } from "../../models/Product";

//#region Actions
export enum ProductActionType {
    ADD_PRODUCT = "ADD_PRODUCTS",
    REMOVE_PRODUCTS = "REMOVE_PRODUCTS",
    UPDATE_PRODUCT = "UPDATE_PRODUCTS",
    UPDATE_SITUATION_PRODUCT = "UPDATE_SITUATION_PRODUCTS",
    RESET_SELECTION = "RESET_SELECTION",
    INITIALIZE_PRODUCT = "INITIALIZE"
}

export function typedAction<T extends string>(type: T): { type: T };

export function typedAction<T extends ProductActionType, P extends any>(
    type: T,
    payload: P
): { type: T; payload: P };

export function typedAction(type: string, payload?: any) {
    return { type, payload };
}

//#endregion

export const AddProduct = (product: Product) => {
    return typedAction(ProductActionType.ADD_PRODUCT, product);
};

export const InitializeProducts = (products: Product[]) => {
    return typedAction(ProductActionType.INITIALIZE_PRODUCT, products);
};

export const UpdateProduct = (product: Product) => {
    return typedAction(ProductActionType.UPDATE_PRODUCT, product);
};

export const RemoveProduct = (id: string[]) => {
    return typedAction(ProductActionType.REMOVE_PRODUCTS, id);
};

export const UpdateSituationProduct = (product: Product, situation: ProductType) => {
    return typedAction(ProductActionType.UPDATE_SITUATION_PRODUCT, { product, situation });
};

export const ResetSelection = () => {
    return typedAction(ProductActionType.RESET_SELECTION, {});
};



export type ProductAction = ReturnType<typeof AddProduct |
    typeof InitializeProducts |
    typeof UpdateProduct |
    typeof RemoveProduct |
    typeof UpdateSituationProduct |
    typeof ResetSelection>;
