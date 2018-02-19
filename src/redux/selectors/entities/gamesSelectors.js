import _ from 'lodash';
import { createSelector } from 'reselect';
// selector
const getMainGamesState = (state) => state.entities.games;
// reselect function
export const getGamesState = createSelector(
    [ getMainGamesState ],
    (games) => games.games
);
export const getHasMoreGamesState = createSelector(
    [ getMainGamesState ],
    (games) => games.hasMore
);
export const getNewFollowersGames = createSelector(
    [ getMainGamesState ],
    (games) => games.newFollowersGames
);
export const getSortGamesState = createSelector(
    [ getMainGamesState ],
    (games) => games.sort
);
export const getSettingFeedGamesState = createSelector(
    [ getMainGamesState ],
    (games) => games.settingFeed
);
export const getLastGameCreatedAtState = (state) => {
    const lastGame = _.last(getGamesState(state));
    return lastGame ? lastGame.created_at : '';
};
