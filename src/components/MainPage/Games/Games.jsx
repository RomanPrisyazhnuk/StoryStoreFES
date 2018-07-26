import './Games.scss';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import Game from 'components/MainPage/Game';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';

const propTypes = {
    currentUserId: PropTypes.string,
    currentUserName: PropTypes.string,
    newFollowersGames: PropTypes.array.isRequired,
    games: PropTypes.array.isRequired,
    hasMore: PropTypes.bool.isRequired,
    searchUsers: PropTypes.func.isRequired,
    // showNotification: PropTypes.func.isRequired,
    getNextData: PropTypes.func.isRequired,
    // getComments: PropTypes.func.isRequired,
    deleteGame: PropTypes.func.isRequired,
    updateGame: PropTypes.func.isRequired,
    // getLinkParse: PropTypes.func.isRequired,
    // getFollowersGame: PropTypes.func.isRequired,
    goProfileAuthor: PropTypes.func.isRequired,
    // goGroup: PropTypes.func.isRequired,
    isSignIn: PropTypes.bool.isRequired
};

const Games = (props) => {
    let {games,
        newFollowersGames,
        currentUserName,
        currentUserId,
        showNotification,
        getComments,
        deleteGame,
        updateGame,
        getLinkParse,
        getFollowersGame,
        goProfileAuthor,
        isSignIn,
        goGroup,
        syncCharts,
        searchUsers,
        params} = props;
    const showFollowersGames = () => {
        getFollowersGame(newFollowersGames);
    };
    games = {gameId1: {id: 5, title: 'game 1', description: 'bla'}, gameId2: {id: 3, title: 'game2', description: 'blabla'}};
    return (
        <div className="st-games">
            {newFollowersGames.length !== 0 && <div className="w-100 st-games-has-more" onClick={showFollowersGames}>
                <FormattedMessage id="games.hasNewGames" />
            </div>}
            {_.map(games, (game) =>
                <Game
                    key={game.id}
                    game={game}
                    currentUserName={currentUserName}
                    currentUserId={currentUserId}
                    showNotification={showNotification}
                    getComments = {getComments}
                    deleteGame = {deleteGame}
                    updateGame = {updateGame}
                    getLinkParse = {getLinkParse}
                    goProfileAuthor = {goProfileAuthor}
                    goGroup = {goGroup}
                    syncCharts = {syncCharts}
                    isSignIn = {isSignIn}
                    searchUsers = {searchUsers}
                    params = {params || {}}
                />
            )}
        </div>
    );
};

Games.propTypes = propTypes;

export default withRouter(Games);
