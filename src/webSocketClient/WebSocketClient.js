// import { createCommentSuccess, deleteCommentSuccess, updateCommentSuccess } from 'redux/actions/entities/commentsActions';
import { getNoticeSuccess, deleteNoticeSuccess } from 'redux/actions/entities/noticeActions';
import { followersGameEnabled } from 'redux/actions/entities/gamesActions';
import io from 'socket.io-client';
import { updateLikeSuccess } from 'redux/actions/entities/likesActions';
import { updateUsersStatus } from 'redux/actions/entities/usersStatusActions';

export default class WebSocketClient {
    constructor ({ wsUrl = 'http://localhost:8082'} = {}) {
        this.wsUrl = wsUrl;
    }
    initialize (dispatch, headers) {
        if (!headers) {
            throw new Error('headers is not defined!');
        }
        this.dispatch = dispatch;
        this.headers = headers;
        this.websocket = this.createWebSocketConnection();
    }
    createWebSocketConnection () {
        if (this.websocket) {
            this.websocket.close();
        }
        let websocket = io.connect(this.wsUrl, {
            query: `client=${this.headers ? this.headers['client'] : ''}`
        });

        websocket.on('connect', this.onWebSocketConnect);
        websocket.on('evt', this.onWebSocketMessage);
        websocket.on('disconnect', this.onDisconnect);
        websocket.on('error', this.onWebSocketError);
        return websocket;
    }
    closeWebSocketConnection () {
        if (this.websocket) {
            this.websocket.close();
        }
    }
    onWebSocketConnect () {
    }
    onWebSocketMessage = (event) => {
        let message = '';
        try {
            message = JSON.parse(event);
        } catch (error) {
            message = '';
        }
        switch (message.type) {
        case 'comment':
            this.actionComment(message);
            break;
        case 'like':
            this.actionLike(message);
            break;
        case 'notify':
            this.actionNotify(message);
            break;
        case 'show_game':
            this.actionShowGame(message);
            break;
        case 'user_status':
            this.actionUserStatus(message);
        }
    };
    onDisconnect = () => {
    };
    onWebSocketError = () => {
    };
    // actionComment (message) {
    //     switch (message.action) {
    //     case 'create':
    //         this.dispatch(createCommentSuccess(message.data, message.data.commentable_id));
    //         break;
    //     case 'update':
    //         this.dispatch(updateCommentSuccess(message.data, message.data.commentable_id));
    //         break;
    //     case 'destroy':
    //         this.dispatch(deleteCommentSuccess(message.data.id, message.data.commentable_id));
    //         break;
    //     }
    // }
    actionLike (message) {
        this.dispatch(updateLikeSuccess({
            likedId: message.data.liked_id,
            likedType: message.data.liked_type,
            count: message.data.count_likes,
            liked: message.data.liked
        }));
    }
    actionShowGame (message) {
        this.dispatch(followersGameEnabled(message.data, message.data));
    }
    actionNotify (message) {
        switch (message.action) {
        case 'create':
            this.dispatch(getNoticeSuccess(message.data));
            break;
        case 'destroy':
            this.dispatch(deleteNoticeSuccess(message.data.id));
            break;
        }
    }
    actionUserStatus (message) {
        this.dispatch(updateUsersStatus(message.data.user_id, message.data));
    }
    subscribeGameChannel = (channel) => {
        if (this.websocket) {
            this.websocket.emit('subscribeChannel', channel);
        }
    }
}
