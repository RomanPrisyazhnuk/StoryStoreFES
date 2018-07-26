import './GameCollaborators.scss';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    collaborators: PropTypes.array.isRequired,
    goProfileAuthor: PropTypes.func.isRequired,
    toggleModalCollaborators: PropTypes.func.isRequired
};

const GameCollaborators = ({collaborators, goProfileAuthor, currentUserId, currentUserName, toggleModalCollaborators, intl}) => {
    const checkConfirm = (collaborator) => {
        return collaborator.confirmed ? 'st-game-collaborator-name-confirmed' : 'st-game-collaborator-name-unconfirmed';
    };
    const collaboratorName = (collaborator) => {
        return collaborator.id === currentUserId ? currentUserName : collaborator.name;
    };
    if (collaborators.length === 1) {
        return <span className="st-game-collaborators">
            <span className="st-game-collaborator-separate"> {intl.formatMessage({ id: 'gameCollaborators.with' })} </span>
            <span onClick={goProfileAuthor.bind(this, collaborators[0].id)}
                className={checkConfirm(collaborators[0])}>{collaboratorName(collaborators[0])}
            </span>
        </span>;
    } else if (collaborators.length === 2) {
        return <span className="st-game-collaborators">
            <span className="st-game-collaborator-separate"> {intl.formatMessage({ id: 'gameCollaborators.with' })} </span>
            <span onClick={goProfileAuthor.bind(this, collaborators[0].id)}
                className={checkConfirm(collaborators[0])}>{collaboratorName(collaborators[0])}
            </span>
            <span className="st-game-collaborator-separate"> {intl.formatMessage({ id: 'gameCollaborators.and' })} </span>
            <span onClick={goProfileAuthor.bind(this, collaborators[1].id)}
                className={checkConfirm(collaborators[1])}>{collaboratorName(collaborators[1])}
            </span>
        </span>;
    } else if (collaborators.length > 2) {
        return <span className="st-game-collaborators">
            <span className="st-game-collaborator-separate"> {intl.formatMessage({ id: 'gameCollaborators.with' })} </span>
            <span onClick={goProfileAuthor.bind(this, collaborators[0].id)}
                className={checkConfirm(collaborators[0])}>{collaboratorName(collaborators[0])}
            </span>
            <span className="st-game-collaborator-separate"> {intl.formatMessage({ id: 'gameCollaborators.and' })} </span>
            <span onClick={toggleModalCollaborators}
                className="st-game-collaborator-name-confirmed">
                {intl.formatMessage({ id: 'gameCollaborators.other' })} {collaborators.length - 1}
            </span>
        </span>;
    } else {
        return null;
    }
};

GameCollaborators.propTypes = propTypes;

export default injectIntl(GameCollaborators);
