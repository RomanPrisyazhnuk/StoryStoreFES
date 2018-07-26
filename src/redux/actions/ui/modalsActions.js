export const TOGGLE_MODAL = 'TOGGLE_MODAL';

export function toggleModal (type) {
    return {type: TOGGLE_MODAL, payload: type};
}
