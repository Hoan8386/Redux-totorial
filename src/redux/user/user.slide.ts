import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ===================== API =====================

export const fetchListUser = createAsyncThunk(
    'users/fetchListUser',
    async () => {
        const res = await fetch("http://localhost:8000/users");
        const data = await res.json();
        return data;
    }
)

interface IUserPayload {
    email: string;
    name: string;
}

export const createNewUser = createAsyncThunk(
    'users/createNewUser',
    async (payload: IUserPayload, thunkAPI) => {
        const res = await fetch("http://localhost:8000/users", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        if (data?.id) {
            thunkAPI.dispatch(fetchListUser());
        }
        return data;
    }
)

interface IUserUpdatePayload extends IUserPayload {
    id: number;
}

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (payload: IUserUpdatePayload, thunkAPI) => {
        const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
            method: "PUT",
            body: JSON.stringify({
                email: payload.email,
                name: payload.name
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        if (data?.id) {
            thunkAPI.dispatch(fetchListUser());
        }
        return data;
    }
)

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (id: number, thunkAPI) => {
        await fetch(`http://localhost:8000/users/${id}`, {
            method: "DELETE"
        });
        thunkAPI.dispatch(fetchListUser());
        return id;
    }
);

// ===================== Slice =====================

interface IUser {
    id: number;
    name: string;
    email: string;
}

const initialState: {
    listUser: IUser[];
    isCreateSuccess: boolean;
    isUpdateSuccess: boolean;
    isDeleteSuccess: boolean
} = {
    listUser: [],
    isCreateSuccess: false,
    isUpdateSuccess: false,
    isDeleteSuccess: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetCreate(state) {
            state.isCreateSuccess = false;
        },
        resetUpdate(state) {
            state.isUpdateSuccess = false;
        },
        // Trong reducers
        resetDelete(state) {
            state.isDeleteSuccess = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchListUser.fulfilled, (state, action) => {
                state.listUser = action.payload;
            })
            .addCase(createNewUser.fulfilled, (state) => {
                state.isCreateSuccess = true;
            })
            .addCase(updateUser.fulfilled, (state) => {
                state.isUpdateSuccess = true;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.isDeleteSuccess = true;
            });
    }
})

export const { resetCreate, resetUpdate, resetDelete } = userSlice.actions;

export default userSlice.reducer;
