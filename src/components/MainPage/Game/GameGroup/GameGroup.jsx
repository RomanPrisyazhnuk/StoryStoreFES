import './GameGroup.scss';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    game: PropTypes.object,
    groupId: PropTypes.string,
    goGroup: PropTypes.func.isRequired
};

const GameGroup = ({game, groupId, goGroup}) => {
    if (game.group_name && !groupId) {
        return <span>
            <svg className="st-game-group-icon" fill="#808080" height="14" viewBox="0 0 24 24" width="14" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5v14l11-7z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
            <span onClick={goGroup.bind(this, game.group_id)} className="st-game-group-title-text">{game.group_name}</span>
        </span>;
    } else {
        return null;
    }
};

GameGroup.propTypes = propTypes;

export default GameGroup;
