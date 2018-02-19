export const GET_USER_STATUS = 'GET_USER_STATUS';

export function updateUsersStatus (userId, status) {
    return {type: GET_USER_STATUS, userId, status};
}
