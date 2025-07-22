import { createSlice } from "@reduxjs/toolkit"


function saveToLocalStorage(state) {
    localStorage.setItem("cart",JSON.stringify(state));
}
const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : { arr: [], totalSum: 0, totalCnt: 0 };
};

const initialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            let ind = state.arr.findIndex(item => item._id == action.payload._id)
            if (ind > -1){
                state.arr[ind].qty++;
                state.totalSum+=state.arr[ind].price
            }
            else{
                state.arr.push({ ...action.payload, qty: 1 });
                state.totalSum+=state.arr[state.arr.length-1].price
            }
            state.totalCnt++;
            saveToLocalStorage(state);
        },
        removeFromCart: (state, action) => {
            state.arr = state.arr.filter(item => item._id != action.payload);
            saveToLocalStorage(state);
        },
        increaseQty: (state, action) => {
            let ind = state.arr.findIndex(item => item._id === action.payload);
            if (ind > -1){
                state.arr[ind].qty++;
                state.totalSum+=state.arr[ind].price;
                state.totalCnt++;
            }
            saveToLocalStorage(state);
        },
        decreaseQty: (state, action) => {
            let ind = state.arr.findIndex(item => item._id === action.payload);
            state.totalSum-=state.arr[ind].price;
            if (state.arr[ind].qty == 1)
                state.arr = state.arr.filter(item => item._id != action.payload);
            else
                if (ind > -1)
                    state.arr[ind].qty--;
                state.totalCnt--;   
                saveToLocalStorage(state);
        },
        clearCart:(state )=>{
            state.arr=[];
            state.totalCnt=0;
            state.totalSum=0;
            saveToLocalStorage(state);
        }
    }
})
export const { addToCart, increaseQty, decreaseQty, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;