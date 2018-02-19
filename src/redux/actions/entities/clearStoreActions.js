export const CLEAR_STORE = 'CLEAR_STORE';

export function clearStore () {
    return dispatch => {
        dispatch({ type: CLEAR_STORE });
        return Promise.resolve();
    };
}
