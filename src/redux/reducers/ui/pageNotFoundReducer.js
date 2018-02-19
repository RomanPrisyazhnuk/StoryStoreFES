import { PAGE_NOT_FOUND } from 'redux/actions/ui/pageNotFoundActions';

const initialState = { isShow: false };

export default function (state = initialState, action) {
    switch (action.type) {
    case PAGE_NOT_FOUND:
        return {...state, isShow: true };
    case '@@router/LOCATION_CHANGE':
        return state.isShow ? initialState : state;
    default:
        return state;
    }
}
