import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import {productService} from "./productService";
import {toast} from "react-toastify"

export const getAllProducts = createAsyncThunk("product/get", 
    async (data,thunkAPI) => {
    try {
        return await productService.getProducts(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const getAProduct = createAsyncThunk("product/getAProduct", 
    async (id,thunkAPI) => {
    try {
        return await productService.getSingleProduct(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const addToWishlist = createAsyncThunk("product/wishlist", 
    async (prodId,thunkAPI) => {
    try {
        return await productService.addToWishlist(prodId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const addRating = createAsyncThunk("product/rating", 
    async (data,thunkAPI) => {
    try {
        return await productService.rateProduct(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});




const productState = {
  product:"",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const productSlice = createSlice({
  name: "product",
  initialState: productState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleproduct = action.payload;
        state.message="Thanh cong"
      })
      .addCase(getAProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
      })
      
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addToWishlist = action.payload;
        state.message="success"
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addRating.pending, (state) => {
        state.isLoading = true;
      })
      
      .addCase(addRating.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.rating = action.payload;
        state.message="Thêm Bình Luận Đánh Giá Thành Công"
        if(state.isSuccess ===true){
          toast.success("Thêm Bình Luận Đánh Giá Thành Công");
        }
      })
      .addCase(addRating.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      //.addCase(resetState, () => initialState);
  },
});
export default productSlice.reducer;
