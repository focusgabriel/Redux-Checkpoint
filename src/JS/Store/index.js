import { createStore } from 'redux'
import TodoReducer from '../Reducers/reducers'

const store = createStore(TodoReducer);

export default store;