import { ListModeType, ListModeAction, ListModeActionType } from "./ListModeAction";

const initialState: ListModeType = ListModeType.LIST;

export function ListModeReducer(
    state = initialState,
    action: ListModeAction
): ListModeType {
    switch (action.type) {
        case (ListModeActionType.CHANGE_LIST_MODE):
            return action.payload;

        default:
            return state;
    }
}