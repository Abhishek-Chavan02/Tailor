const initialState = {
    users: [],
    pagination: null,
    loading: false,
    error: null,
};

export const getAllUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USER_GET_ALL_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "USER_GET_ALL_SUCCESS":
            return {
                ...state,
                loading: false,
                users: action.payload.users ?? [],
                pagination: action.payload.pagination ?? null,
            };
        case "USER_GET_ALL_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const updateUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USER_UPDATE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "USER_UPDATE_SUCCESS":
            return {
                ...state,
                loading: false,
                updatedUser: action.payload.user,
            };
        case "USER_UPDATE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const deleteUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USER_DELETE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "USER_DELETE_SUCCESS":
            return {
                ...state,
                loading: false,
                deletedUser: action.payload.user,
            };
        case "USER_DELETE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}; 