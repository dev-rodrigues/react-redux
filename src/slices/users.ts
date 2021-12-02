import {
    createSlice, 
    PayloadAction
} from '@reduxjs/toolkit';
import { User } from "../store/user/user";
import { RootState } from '.';
import { AppDispatch, AppThunk } from '../store';

export type UsersState = {
    loading: boolean;
    hasErrors: boolean;
    users: User[];
}

export const initialState: UsersState = {
    loading: false,
    hasErrors: false,
    users: [],
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload);
        },
        startLoading: (state) => {
            state.loading = true;
        },
        getUsersSuccess: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
            state.loading = false;
            state.hasErrors = false;
        },
        getUsersFailure: (state) => {
            state.loading = false;
            state.hasErrors = true;        
        },
    },
});

const {
    addUser,
    startLoading,
    getUsersFailure,
    getUsersSuccess,
} = usersSlice.actions;

export const userSelector = (state: RootState) => state.users;
const userReducer = usersSlice.reducer;
export default userReducer;

export const fetchUsers = (): AppThunk => async (dispatch: AppDispatch) => {
    try {
        dispatch(startLoading());
    
        const data: User[] = [];

        // setTimeout(() => {

        //      data.push(
        //         {
        //             id: 1,
        //             name: "string",
        //             username: "string",
        //             email: "string",
        //             address: {
        //                 street: "string",
        //                 suite: "string",
        //                 city: "string",
        //                 zipecode: "string",
        //                 geo: {
        //                     lat: "string",
        //                     lng: "string"
        //                 }
        //             },
        //             phone: "string",
        //             website: "string",
        //             company: {
        //                 name: "string",
        //                 catchPhrase: "string",
        //                 bs: "string",
        //             }
        //         }
        //     );
            
        // }, 2000);

        dispatch(getUsersSuccess(data));
    } catch (error) {
        dispatch(getUsersFailure());
    }
}

export const createUser = (User: User): AppThunk => async (dispatch: AppDispatch) => {
    try {
        dispatch(addUser(User));
    } catch (error) {
        dispatch(getUsersFailure());
    }
}