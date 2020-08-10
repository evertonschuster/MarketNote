import React, { useCallback, useMemo, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Button, IconNode } from 'react-native-elements';//TODO:
// import ListItemBuy from './components/ListItemBuy';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';
import ListItemBuy from './components/ListItemBuy';
import { RootState } from '../../reducers';
import { useSelector, useDispatch } from 'react-redux';
import { ListModeType, ChangeListMode } from '../../reducers/listMode/ListModeAction';
import { ResetSelection, RemoveProduct } from '../../reducers/product/ProductAction';
// import StorageItem from '../../services/StorageItem';
//https://github.com/instea/react-native-popup-menu/blob/master/src/MenuTrigger.js

export const HomeScreen: React.FC = () => {

    const dispatch = useDispatch()
    const { colors } = useTheme();
    const navigation = useNavigation();
    const listMode = useSelector((e: RootState) => e.listMode)
    const store = useSelector((e: RootState) => e.store)

    //#region header
    const iconSetting: IconNode = useMemo(() => ({
        name: "add",
        size: 25,
        color: colors.background
    }), []);

    const headerOptionDefault: StackHeaderOptions = useMemo(() => ({
        headerRight: () => (
            <Button onPress={() => { navigation.navigate("NewItemBuy") }}
                icon={{ ...iconSetting }}
                buttonStyle={styles.buttonHeader} />),
        headerLeft: undefined,
        headerTitle: "Bem vindo"
    }), [])

    const headerOptionEdit: StackHeaderOptions = useMemo(() => ({
        headerRight: () => {
            return <View style={styles.containerButtonHeader}>
                {store.countSelection === 1 && <Button onPress={EditProduct}
                    icon={{ ...iconSetting, name: "edit" }}
                    buttonStyle={styles.buttonHeader} />}
                <Button onPress={deleteItem}
                    icon={{ ...iconSetting, name: "delete" }}
                    buttonStyle={styles.buttonHeader} />
                <Button onPress={cancelEdit}
                    icon={{ ...iconSetting, name: "done" }}
                    buttonStyle={styles.buttonHeader} />
            </View>
        },
        headerLeft: () => {
            return <Button onPress={cancelEdit}
                icon={{ ...iconSetting, name: "arrow-back" }}
                buttonStyle={styles.buttonHeader} />
        },

        headerTitle: ""
    }), [store, EditProduct, deleteItem])

    useEffect(() => {
        if (listMode === ListModeType.LIST) {
            navigation.setOptions(headerOptionDefault);
            return;
        }
        navigation.setOptions(headerOptionEdit);
    }, [listMode, store, navigation, headerOptionDefault, headerOptionEdit])

    //#endregion

    async function deleteItem() {
        let deleteId = store.productSelection.map(e => e.id ?? "");
        dispatch(ChangeListMode(ListModeType.LIST))
        dispatch(RemoveProduct(deleteId))
    }

    const cancelEdit = useCallback(
        () => {
            dispatch(ChangeListMode(ListModeType.LIST))
            dispatch(ResetSelection())
        }, [])

    function EditProduct() {
        navigation.navigate("NewItemBuy", store.productSelection[0])
        dispatch(ChangeListMode(ListModeType.LIST))
        dispatch(ResetSelection())
    }


    return (
        <ListItemBuy />

    )

};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
    },
    buttonHeader: {
        backgroundColor: "transparent"
    },
    containerButtonHeader: {
        flexDirection: "row"
    }
});