// TODO: We should move typedAction elsewhere since it's shared
//https://levelup.gitconnected.com/set-up-a-typescript-react-redux-project-35d65f14b869

import { Product, ProductType } from "../../models/Product";
import { ProductAction, ProductActionType } from "./ProductAction";

type ProductState = {
    products: Product[];
    loading: boolean;
    countSelection: number;
    productSelection: Product[];
};

const initialState: ProductState = {
    products: [
        {
            id: "1",
            name: "Nome 1",
            situation: ProductType.toSelect
        },
        {
            id: "2",
            name: "Nome 2",
            situation: ProductType.toSelect
        },
        {
            id: "3",
            name: "Nome 3",
            situation: ProductType.toSelect
        }
    ],
    loading: false,
    countSelection: 0,
    productSelection: []
};

export function productsReducer(
    state = initialState,
    action: ProductAction
): ProductState {
    switch (action.type) {
        case ProductActionType.ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload],
            };
        case ProductActionType.INITIALIZE_PRODUCT: {
            return { ...state, products: action.payload }
        };
        case ProductActionType.UPDATE_PRODUCT:
            let products = state.products.map(e => {
                if (e.id === action.payload.id) {
                    return action.payload;
                }

                return e;
            })
            return {
                ...state,
                products,
            };
        case ProductActionType.UPDATE_SITUATION_PRODUCT: {
            let products = state.products;
            let selection = products.filter(e => e.situation === ProductType.selectedInSelection || e.situation === ProductType.toSelectInSelection);
            let countSelection = selection.length

            if (countSelection === 1 && (action.payload.situation === ProductType.selected || action.payload.situation === ProductType.toSelect)) {

            } else {
                products = state.products.map(e => {
                    if (e.id === action.payload.product.id) {
                        return { ...e, situation: action.payload.situation };
                    }
                    return e;
                })

                selection = products.filter(e => e.situation === ProductType.selectedInSelection || e.situation === ProductType.toSelectInSelection);
                countSelection = selection.length
            }

            return {
                ...state,
                products,
                countSelection,
                productSelection: selection
            }
        }
        case ProductActionType.RESET_SELECTION: {
            let products = state.products.map(e => {
                switch (e.situation) {
                    case ProductType.selectedInSelection:
                        return { ...e, situation: ProductType.selected };
                    case ProductType.toSelectInSelection:
                        return { ...e, situation: ProductType.toSelect };
                    default:
                        return e;
                }
            })
            return { ...state, products, countSelection: 0, productSelection: [] }
        }
        case ProductActionType.REMOVE_PRODUCTS: {
            let products = state.products.filter(e => !action.payload.includes(e.id ?? ""))
            return { ...state, products, countSelection: 0, productSelection: [] };
        }
        default:
            return state;
    }
}