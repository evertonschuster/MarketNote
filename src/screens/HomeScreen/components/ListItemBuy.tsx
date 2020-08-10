import React, { memo } from 'react'
import { SafeAreaView, FlatList, Text } from 'react-native'
import { useSelector } from 'react-redux';
import { RootState } from '../../../reducers';
import RenderItemBuy from './RenderItemBuy';
import { ProductType } from '../../../models/Product';

export interface Props {
}

const ListItemBuy: React.FC<Props> = () => {
    const products = useSelector((e: RootState) => e.store.products)
    const listMode = useSelector((e: RootState) => e.listMode)

    return (
        <SafeAreaView >
            <Text>A Comprar</Text>
            <FlatList
                data={products}
                renderItem={(item) => <RenderItemBuy {...item} showSituations={[ProductType.toSelect, ProductType.toSelectInSelection]} listMode={listMode} />}
                keyExtractor={item => item.id + "1" ?? ""}
            />

            <Text>No Carrinho</Text>
            <FlatList
                data={products}
                renderItem={(item) => <RenderItemBuy {...item} showSituations={[ProductType.selected, ProductType.selectedInSelection]} listMode={listMode} />}
                keyExtractor={item => item.id + "1" ?? ""}
            />
        </SafeAreaView>
    )

}

export default memo(ListItemBuy)
