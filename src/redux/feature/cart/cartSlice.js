import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0,
  grandTotal: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isExist = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (!isExist) {
        state.products.push({ ...action.payload, quantity: 1 });
      } else {
        console.log("Item already added to cart");
      }
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },
  },
});

// utility functions

export const setSelectedItems = (state) => {
  return state.products.reduce((total, product) => total + product.quantity, 0);
};

export const setTotalPrice = (state) => {
  return state.products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
};

export const setTax = (state) => {
  return setTotalPrice(state) * state.taxRate;
};

export const setGrandTotal = (state) => {
  return state.totalPrice + state.tax;
};

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;



// import { createSlice } from "@reduxjs/toolkit";

// // Initial state of the cart
// const initialState = {
//   products: [],       // Array to hold the products added to the cart
//   selectedItems: 0,   // Number of total items (summed quantities) in the cart
//   totalPrice: 0,      // Total price of the products in the cart
//   tax: 0,             // Tax amount, based on total price
//   taxRate: 0,         // Tax rate that will be applied to the total price
//   grandTotal: 0,      // Final amount (total price + tax)
// };

// // Creating the cart slice using createSlice function
// const cartSlice = createSlice({
//   name: "cart",            // Name of the slice, used in actions and reducers
//   initialState,            // The initial state defined above
//   reducers: {
//     // Reducer function to handle adding an item to the cart
//     addToCart: (state, action) => {
//       // Check if the product already exists in the cart by matching product _id
//       const isExist = state.products.find(
//         (product) => product._id === action.payload._id
//       );

//       // If the product does not exist in the cart
//       if (!isExist) {
//         // Add the new product with a quantity of 1 to the cart
//         state.products.push({ ...action.payload, quantity: 1 });
//       } else {
//         // If the product already exists in the cart, log a message to the console
//         console.log("Item already added to cart");
//       }

//       // Recalculate the total selected items after adding to the cart
//       state.selectedItems = setSelectedItems(state);
//       // Recalculate the total price of the cart
//       state.totalPrice = setTotalPrice(state);
//       // Recalculate the tax based on the new total price
//       state.tax = setTax(state);
//       // Recalculate the grand total (total price + tax)
//       state.grandTotal = setGrandTotal(state);
//     },
//   },
// });

// // Utility function to calculate the total number of selected items
// export const setSelectedItems = (state) => {
//   // Use reduce to sum up the quantity of all products in the cart
//   return state.products.reduce((total, product) => total + product.quantity, 0);
// };

// // Utility function to calculate the total price of items in the cart
// export const setTotalPrice = (state) => {
//   // Use reduce to calculate the total price: price * quantity for each product
//   return state.products.reduce(
//     (total, product) => total + product.price * product.quantity,
//     0
//   );
// };

// // Utility function to calculate the tax based on the total price
// export const setTax = (state) => {
//   // Multiply the total price by the tax rate to get the tax amount
//   return setTotalPrice(state) * state.taxRate;
// };

// // Utility function to calculate the grand total (total price + tax)
// export const setGrandTotal = (state) => {
//   // Add the total price and tax to get the grand total
//   return state.totalPrice + state.tax;
// };

// // Export the action from the cart slice to be used in the app
// export const { addToCart } = cartSlice.actions;

// // Export the reducer so it can be included in the store
// export default cartSlice.reducer;

