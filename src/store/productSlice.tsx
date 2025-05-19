import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: ProductTypes[] = []
const productSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        onAddToCart(state, action: PayloadAction<ProductTypes>) {
            state.push({...action.payload, cartQuantity: 1})
        },
        onUpdateCard(state, action: PayloadAction<number>) {
            const updatedState = state.map(
                product => {
                    if (action.payload === product.id) {
                       return { ...product, cartQuantity: (product.cartQuantity ?? 0) + 1 };
                    } 
                    return product;
                }
            )
            return updatedState
        },
        removeFromCart(state, action: PayloadAction<number>) {
            const updatedState = state.map(
                product => {
                    if (action.payload === product.id && (product.cartQuantity ?? 0) >= 1) {
                       return { ...product, cartQuantity: product.cartQuantity ?? 0 - 1 };
                    } else {
                        return product;  
                    }
                }
            )
            return updatedState
        },
        onDeleteCartItem(state, action: PayloadAction<number>) {
            const updatedState = state.filter(product => {
                if (action.payload === product.id) {
                  // ❌ Remove this product by returning false
                  return false;
                }
                return true; // ✅ Keep all others
              });
              
              return updatedState;    
        }
    }
});

export const {
    onAddToCart,
    onUpdateCard,
    removeFromCart,
    onDeleteCartItem
} = productSlice.actions;
export default productSlice.reducer;