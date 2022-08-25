import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  token: '',
  user: {},
  property: {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'USER_SET_TOKEN':
      AsyncStorage.setItem('token', action.payload.token);
      return {...state, token: action.payload.token};
    case 'USER_SET_USER':
      return {...state, user: action.payload.user};
    case 'USER_SET_PROPERTY':
      return {...state, property: action.payload.property};
  }
}
