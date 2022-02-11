import {SEARCH_TODOS} from '../actions/searchActions';
import {CLEAR_SEARCH} from '../actions/searchActions';

const initialState = [];

export const searchReducer = (state = initialState, action)=>{
    switch(action.type){
        case SEARCH_TODOS:{
            const todos = action.payload.items;
            const text = action.payload.text
            const textToSearch = new RegExp(text, "i");
            console.log('searching', state)
            return [...state,
                ...todos.filter((item) => {
                    if (item.text.search(textToSearch) !== -1 && text != "") {
                      console.log('found',item);
                      return item
                    }
                  })

            ]
        }
        case CLEAR_SEARCH:{
            return initialState
        }
        default:
            return state;
    }
}