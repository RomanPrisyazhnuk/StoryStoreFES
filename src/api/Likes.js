import Base from './Base';
import config from 'configApi/config';

export default class Likes extends Base {
    updateLike (likedId, likedType, headers) {
        return this.apiClient.game(`${this.scope(likedType)}${likedId}${config.likes.updateLike}`, {}, headers);
    }
    getLikeNames (elementId, likedType, headers) {
        return this.apiClient.game(`${this.scope(likedType)}${elementId}${config.likes.getLikesNames}`, {}, headers);
    }
    scope (likedType) {
        return likedType === 'Game' ? config.games.games : config.comments.commentsScope;
    }
}
