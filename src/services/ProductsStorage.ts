import { AsyncStorage } from 'react-native';
import { Product } from '../models/Product';
const PRODUCT_STORAGE_KEU = "products"

class ProductsStorage {
    GetAll = async () => {
        try {
            const value = await AsyncStorage.getItem(PRODUCT_STORAGE_KEU);
            if (value === null) {
                return null;
            }

            return JSON.parse(value) as Product[];
        } catch (error) {
            // Error retrieving data
        }
    }

    SaveAll = async (items: Product[]) => {

        try {
            await AsyncStorage.setItem(PRODUCT_STORAGE_KEU, JSON.stringify(items));
        } catch (error) {
            // Error saving data
        }
    }
}

export default new ProductsStorage();