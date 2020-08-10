import React, { memo } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { View, Text, CheckBox, StyleSheet, ListRenderItemInfo } from 'react-native'
import { Product, ProductType } from '../../../models/Product'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateSituationProduct } from '../../../reducers/product/ProductAction';
import { ListModeType, ChangeListMode } from '../../../reducers/listMode/ListModeAction'
import { RootState } from '../../../reducers'

export interface Props extends ListRenderItemInfo<Product> {
    showSituations: ProductType[],
    listMode: ListModeType
}

const RenderItemBuy: React.FC<Props> = (props) => {
    console.debug("props", props.item.id)

    if (props.showSituations.findIndex(e => e === props.item.situation) < 0) {
        return null;
    }

    const dispatch = useDispatch()
    const listMode = useSelector((e: RootState) => e.listMode)

    let checked = props.item.situation === ProductType.selected || props.item.situation === ProductType.selectedInSelection;
    let isSelected = props.item.situation === ProductType.selectedInSelection || props.item.situation === ProductType.toSelectInSelection;

    function onLongPress() {
        if (listMode === ListModeType.SELECTION) {
            return;
        }
        let situation = props.item.situation === ProductType.selected ? ProductType.selectedInSelection : ProductType.toSelectInSelection;
        dispatch(UpdateSituationProduct(props.item, situation));
        dispatch(ChangeListMode(ListModeType.SELECTION))
    }

    function onSelect() {
        let situation = props.item.situation === ProductType.selected ? ProductType.toSelect : ProductType.selected;
        if (listMode === ListModeType.SELECTION) {
            switch (props.item.situation) {
                case ProductType.selected:
                    situation = ProductType.selectedInSelection;
                    break;
                case ProductType.selectedInSelection:
                    situation = ProductType.selected;
                    break;

                case ProductType.toSelect:
                    situation = ProductType.toSelectInSelection;
                    break;

                case ProductType.toSelectInSelection:
                    situation = ProductType.toSelect;
                    break;
                default:
                    break;
            }
        }

        return dispatch(UpdateSituationProduct(props.item, situation))
    }

    return (
        <TouchableOpacity
            key={props.index}
            onLongPress={onLongPress}
            onPress={onSelect}
            style={[styles.listItem, isSelected ? styles.listItemSelected : {}]}>

            <View>
                <Text style={[styles.listItemTitle, checked ? styles.listItemTitleChecked : {}]} >{(props.item.name?.length ?? 0) > 25 ? `${props.item.name?.substring(0, 25)}...` : props.item.name}</Text>
                <Text style={styles.listItemDescription}>{(props.item.description?.length ?? 0) > 45 ? `${props.item.description?.substring(0, 45)}...` : props.item.description}</Text>
            </View>
            <View style={{ flexDirection: "row" }} >
                <Text style={styles.listItemAmount}>{props.item.amount}</Text>
                <CheckBox value={checked} onChange={onSelect} />
            </View>
        </TouchableOpacity>
    )

}

const propsAreEqual = (prevProps: Readonly<React.PropsWithChildren<Props>>, nextProps: Readonly<React.PropsWithChildren<Props>>) => {
    let prevItemId = prevProps.item.id;
    let nextItemId = nextProps.item.id;

    let prevItemName = prevProps.item.name
    let nextItemName = nextProps.item.name

    let prevItemAmount = prevProps.item.amount
    let nextItemAmount = nextProps.item.amount

    let prevItemSituation = prevProps.item.situation;
    let nextItemSituation = nextProps.item.situation;



    return prevItemSituation === nextItemSituation &&
        prevItemAmount === nextItemAmount &&
        prevItemName === nextItemName &&
        nextItemId === prevItemId;
}

export default memo(RenderItemBuy, propsAreEqual)


const styles = StyleSheet.create({
    listItem: {
        borderBottomWidth: 0.3,
        borderBottomColor: "rgba(26,46,53, 0.1)",
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    listItemSelected: {
        backgroundColor: "#2080A036",
    },
    listItemTitle: {
        fontSize: 20,
        color: "#000000c0",

    },
    listItemAmount: {
        alignSelf: "center",
        fontSize: 20
    },
    listItemTitleChecked: {
        textDecorationLine: "line-through"
    },
    listItemDescription: {
        fontSize: 12,
        color: "#000000b0"
    },
})