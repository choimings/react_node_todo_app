import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; // 툴킷 임포트
import {
  DELETE_TASKS_API_URL,
  GET_TASKS_API_URL,
  POST_TASKS_API_URL,
} from '../../utils/apiUrl'; // API URL 임포트
import {
  deleteRequest,
  getRequest,
  postRequest,
} from '../../utils/requestMethods'; // API 메서드 임포트

// 공통된 비동기 액션 생성 로직을 별도의 함수로 분리
const getItemsFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (userId) => {
    // console.log(apiURL, userId);
    const fullPath = `${apiURL}/${userId}`;
    return await getRequest(fullPath);
  });
};

const postItemFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (postData) => {
    const options = {
      body: JSON.stringify(postData), // 표준 json 문자열로 변환
    };
    return await postRequest(apiURL, options);
  });
};

const deleteItemFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (id) => {
    const options = {
      method: 'DELETE',
    };
    const fullPath = `${apiURL}/${id}`;
    return await deleteRequest(fullPath, options);
  });
};

export const fetchGetItemsData = getItemsFetchThunk(
  'fetchGetItems',
  GET_TASKS_API_URL
);

export const fetchPostItemData = postItemFetchThunk(
  'fetchPostItem',
  POST_TASKS_API_URL
);

export const fetchDeleteItemData = deleteItemFetchThunk(
  'fetchDeleteItem',
  DELETE_TASKS_API_URL
);

const handleFullfilled = (stateKey) => (state, action) => {
  state[stateKey] = action.payload;
};

const handleRejected = (state, action) => {
  console.log(action.payload);
  state.isError = true;
};

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    getItemsData: null,
    postItemData: null,
    deleteItemData: null,
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchGetItemsData.fulfilled, handleFullfilled('getItemsData'))
      .addCase(fetchGetItemsData.rejected, handleRejected)

      .addCase(fetchPostItemData.fulfilled, handleFullfilled('postItemsData'))
      .addCase(fetchPostItemData.rejected, handleRejected)

      .addCase(
        fetchDeleteItemData.fulfilled,
        handleFullfilled('deleteItemsData')
      )
      .addCase(fetchDeleteItemData.rejected, handleRejected);
  },
});

export default apiSlice.reducer;
