import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import {authService} from "./userService";
import {toast} from "react-toastify"

export const registerUser = createAsyncThunk(
  "auth/register", 
  async (userData,thunkAPI) => {
  try {
    return await authService.register(userData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const loginUser = createAsyncThunk(
  "auth/login", 
  async (userData,thunkAPI) => {
  try {
    return await authService.login(userData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getUseProductrWishlist = createAsyncThunk(
  "user/wishlist", 
  async (thunkAPI) => {
  try {
    return await authService.getUserWishlist();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const addProdToCart = createAsyncThunk(
  "user/cart/add", 
  async (cartData,thunkAPI) => {
  try {
    return await authService.addToCart(cartData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const getUserCart = createAsyncThunk(
  "user/cart/get", 
  async (thunkAPI) => {
  try {
    return await authService.getCart();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getOrders = createAsyncThunk(
  "user/order/get", 
  async (thunkAPI) => {
  try {
    return await authService.getUserOrders();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteCartPoduct = createAsyncThunk(
  "user/cart/product/delete", 
  async (data,thunkAPI) => {
  try {
    return await authService.removeProductFromCart(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


export const updateCartPoduct = createAsyncThunk(
  "user/cart/product/update", 
  async (cartDetail,thunkAPI) => {
  try {
    return await authService.updateProductFromCart(cartDetail);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const updateProfile = createAsyncThunk(
  "user/profile/update", 
  async (data,thunkAPI) => {
  try {
    return await authService.updateUser(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const forgotPasswordToken = createAsyncThunk(
  "user/password/token", 
  async (data,thunkAPI) => {
  try {
    return await authService.forgotPassToken(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const resetPassword = createAsyncThunk(
  "user/password/reset", 
  async (data,thunkAPI) => {
  try {
    return await authService.resetPass(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const getCustomerfromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;


const initialState = {
  user: getCustomerfromLocalStorage,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdUser = action.payload;
        if(state.isSuccess ===true){
          toast.info("Đăng ký tài khoản thành công!");
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if(state.isError ===true){
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        // state.message = "success";
        if(state.isSuccess ===true){
          localStorage.setItem("token", action.payload.token);
          toast.info("Đăng nhập tài khoản thành công!");
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if(state.isError ===true){
          toast.error(action.payload.response.data.message);
        }    
      })
      .addCase(getUseProductrWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUseProductrWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
        // if(state.isSuccess ===true){
        //   localStorage.setItem("token", action.payload.token);
        //   toast.info("Đăng ký tài khoản thành công!");
        // }
      })
      .addCase(getUseProductrWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
       
      })
      .addCase(addProdToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProdToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartProduct = action.payload;
        if(state.isSuccess ===true){
          toast.success("Thêm giỏ hàng thành công!");
        }
      })
      .addCase(addProdToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
       
      })
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartProducts = action.payload;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
       
      })
      .addCase(deleteCartPoduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartPoduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCartProduct = action.payload;
        if(state.isSuccess ===true){
          toast.success("Xoá giỏ hàng thành công!");
        }
      })
      .addCase(deleteCartPoduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
       
      })
      .addCase(updateCartPoduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartPoduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCartProduct = action.payload;
        if(state.isSuccess ===true){
          toast.success("Sửa giỏ hàng thành công!");
        }
      })
      .addCase(updateCartPoduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
       
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getorderedProduct = action.payload;
        
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
       
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedUser = action.payload;
        if(state.isSuccess ===true){
          let currentUserData=JSON.parse(localStorage.getItem("customer"))
          let newUserData={
            _id: currentUserData?._id,
            token:currentUserData.token,
            firstname: action?.payload?.firstname,
            lastname: action?.payload?.lastname,
            email: action?.payload?.email,
            mobile: action?.payload?.mobile,
          }
          console.log(newUserData);
          localStorage.setItem("customer", JSON.stringify(newUserData))
          state.user=newUserData;
          toast.success("Sửa thông tin thành công!");
        }
        
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if(state.isError ===true){
          toast.error("lỗi");
        }
      })
      
      .addCase(forgotPasswordToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPasswordToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.token = action.payload;
        if(state.isSuccess ===true){
          toast.success("Cửa Hàng Đã Gửi mã xác nhận qua email của bạn!");
        }
        
      })
      .addCase(forgotPasswordToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if(state.isError ===true){
          toast.error("lỗi");
        }
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pass = action.payload;
        if(state.isSuccess ===true){
          toast.success("Đặt Lại Mật Khẩu thành công!");
        }
        
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if(state.isError ===true){
          toast.error("lỗi");
        }
      })
      
      //.addCase(resetState, () => initialState);
  },
});
export default authSlice.reducer;
