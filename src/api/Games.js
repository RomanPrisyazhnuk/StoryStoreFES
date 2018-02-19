import Base from './Base';
import config from 'configApi/config';

export default class Games extends Base {
    getGames (params, headers) {
        return this.apiClient.get(config.games.games, {}, params, headers)
            .then(response => {
                const data = {};
                if (response.data) {
                    data.games = response.data.games;
                    data.hasMore = response.data.games.length > 2;
                    data.sort = response.data.sort;
                    data.settingFeed = response.data.subscriptions_first ? 'subscriptions_first' : '';
                }
                return ({headers: response.headers, data});
            });
    }
    getGame (gameId, headers) {
        return this.apiClient.get(`${config.games.games}${gameId}`, {}, {}, headers);
    }
    getMetaFromGameServer (gameId, headers) {
        return this.apiClient.get(`${config.games.games}${gameId}`, {}, {}, headers);
    }
    createGame (data, headers) {
        return this.apiClient.game(`${config.games.games}`, data, headers);
    }
    updateGame (gameId, data, headers) {
        return this.apiClient.put(`${config.games.games}${gameId}`, data, headers);
    }
    deleteGame (gameId, headers) {
        return this.apiClient.delete(`${config.games.games}${gameId}`, headers);
    }
}
