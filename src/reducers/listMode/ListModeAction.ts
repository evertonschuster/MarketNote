export enum ListModeActionType {
    CHANGE_LIST_MODE = "CHANGE_LIST_MODE",
}

export enum ListModeType {
    LIST,
    SELECTION,
}

export function typedAction<T extends string>(type: T): { type: T };

export function typedAction<T extends ListModeActionType, P extends any>(
    type: T,
    payload: P
): { type: T; payload: P };

export function typedAction(type: string, payload?: any) {
    return { type, payload };
}


export const ChangeListMode = (mode: ListModeType) => {
    return typedAction(ListModeActionType.CHANGE_LIST_MODE, mode);
};


export type ListModeAction = ReturnType<typeof ChangeListMode>;