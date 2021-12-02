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
    
        let data: User[] = [];

        data.push({
            id: Math.floor(Math.random() * 100),
            name: 'John Doe',
            username: 'johndoe',
        });
            
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