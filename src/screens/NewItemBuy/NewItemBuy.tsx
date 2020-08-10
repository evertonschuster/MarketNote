import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TextInput, CheckBox } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Button, Icon, } from 'react-native-elements';//TODO:
import { Product, ProductType } from '../../models/Product';
import { useDispatch } from 'react-redux';
import { UpdateProduct } from '../../reducers/product/ProductAction';
import { AddProduct } from './../../reducers/product/ProductAction';

export const NewItemBuy: React.FC<any> = (props) => {

    const { colors } = useTheme();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [stateErrors, setStateErrors] = useState<any>({});
    const [state, setState] = useState<Product>(props.route.params ?? {})
    const [isSelected, setIsSelected] = useState(props.route.params?.situation === ProductType.selectedInSelection);

    const refName = useRef<TextInput>(null)
    const refQuantidade = useRef<TextInput>(null)
    const refDescription = useRef<TextInput>(null)

    const save = useCallback(
        async () => {
            if (!state.name) {
                setStateErrors((old: any) => ({ ...old, name: "Informe o nome do item!" }))
                refName.current?.focus();
                return;
            }
            if (!state.name || (state.name && state.name?.length < 3)) {
                setStateErrors((old: any) => ({ ...old, name: "Nome muito curto!" }))
                refName.current?.focus();
                return;
            }


            state.situation = isSelected ? ProductType.selected : ProductType.toSelect;
            if (state.id) {
                dispatch(UpdateProduct(state))
            }
            else {
                var data = new Date();
                var id = `${data.getFullYear()}${data.getMonth()}${data.getDay()}${data.getHours()}${data.getMinutes()}${data.getSeconds()}`
                state.id = id;
                dispatch(AddProduct(state))
            }


            navigation.goBack();

        }, [state, isSelected])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <Button onPress={save}
                    icon={{
                        name: "done",
                        size: 25,
                        color: colors.background
                    }}
                    buttonStyle={styles.buttonHeader} />
            },
        })

    }, [save, navigation])

    const changeValue = useCallback(
        (name: string, value: string) => {
            setState((old: any) => ({ ...old, [name]: value }))
        }, [])


    return (
        <View style={styles.formContent}>
            <View style={styles.itemGroup}>
                <Text style={styles.label}>Nome:</Text>
                <TextInput
                    ref={refName}
                    autoFocus={true}
                    value={state["name"]}
                    onChangeText={(value) => changeValue("name", value)}
                    onSubmitEditing={() => {
                        refQuantidade.current?.focus();
                    }}
                    style={styles.input} />
                {stateErrors.name && <Text style={styles.labelError}>{stateErrors.name}</Text>}
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <View style={[styles.itemGroup, { flex: 1, paddingEnd: 10 }]}>
                    <Text style={styles.label}>Quantidade:</Text>
                    <TextInput
                        ref={refQuantidade}
                        value={state["amount"]}
                        keyboardType={'numeric'}
                        onChangeText={(value) => changeValue("amount", value)}
                        onSubmitEditing={() => {
                            refDescription.current?.focus();
                        }}
                        style={styles.input} />
                </View>

                <View style={[styles.itemGroup, { flex: 1, paddingStart: 10 }]}>
                    <Text style={styles.label}>No carrinho?:</Text>
                    <View style={{ flexDirection: "row", }}>
                        <Icon name="add-shopping-cart" size={32} onPress={() => setIsSelected(old => !old)} />
                        <CheckBox value={isSelected} onTouchEnd={() => setIsSelected(old => !old)} />
                    </View>
                </View>
            </View>

            <View style={styles.itemGroup}>
                <Text style={styles.label}>Observações:</Text>
                <TextInput
                    value={state["description"]}
                    ref={refDescription}
                    onChangeText={(value) => changeValue("description", value)}
                    style={[styles.input, styles.inputText]}
                    multiline={true}
                    numberOfLines={4} />
            </View>

        </View>);
};


const styles = StyleSheet.create({
    formContent: {
        padding: 24
    },
    itemGroup: {
        paddingBottom: 12,
    },
    label: {
        paddingBottom: 4,
        color: "#000000c0",

    },
    buttonHeader: {
        backgroundColor: "transparent"
    },
    input: {
        color: "#000000b0",
        minHeight: 2,
        borderColor: 'rgba(26,46,53, 0.2)',
        borderWidth: 1,
        borderRadius: 6,
        padding: 5,
        paddingLeft: 10,
    },
    inputText: {
        textAlignVertical: "top"
    },
    labelError: {
        color: "red",
        fontSize: 12
    }
})
