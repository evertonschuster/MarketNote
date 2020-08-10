import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ProductsStorage from './ProductsStorage';
import { InitializeProducts } from '../reducers/product/ProductAction';
import { RootState } from '../reducers';
import { Product } from '../models/Product';

const HandlerStorage: React.FC<any> = (props) => {

    const dispatch = useDispatch();
    const products = useSelector<RootState>(state => state.store.products) as Product[];

    useEffect(() => {
        ProductsStorage.GetAll().then(products => {
            dispatch(InitializeProducts(products ?? []))
        })
    }, [])

    useEffect(() => {
        ProductsStorage.SaveAll(products);
    }, [products])

    return props.children
}

export default HandlerStorage
