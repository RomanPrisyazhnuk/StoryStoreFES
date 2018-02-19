export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';

export function showNotification (data) {
    data.message = data.message.toString();
    return { type: SHOW_NOTIFICATION, payload: data };
}

export function clearNotification () {
    return { type: CLEAR_NOTIFICATION };
}
