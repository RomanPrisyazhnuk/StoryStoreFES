import './ProfileContacts.scss';
import _ from 'lodash';
import { country } from 'components/data/countryData';
import { injectIntl } from 'react-intl';
import JobContacts from './JobContacts/JobContacts';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    userInfo: PropTypes.object.isRequired,
    jobs: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired
};

const ProfileContacts = ({intl, userInfo, jobs}) => {
    return (
        <div className="st-profile-contacts-wrap">
            <h2 className="st-contacts-title">{intl.formatMessage({id: 'profileImageBlock.tabs.contacts'})}</h2>
            {!userInfo.city && !userInfo.country && !userInfo.email && !userInfo.skype && !userInfo.phone &&
            <span className='d-flex justify-content-center no-contacts'>{intl.formatMessage({ id: 'userContacts.none' })}</span>}
            {userInfo.city
                ? <div className='st-profile-contacts-line'>
                    <span className='st-profile-contacts-title' >
                        {intl.formatMessage({ id: 'settingsBodyGeneral.cityTitle' })}
                    </span>
                    <span className='st-profile-contacts-value'>
                        {userInfo.city}
                    </span>
                </div>
                : null}
            {userInfo.country
                ? <div className='st-profile-contacts-line'>
                    <span className='st-profile-contacts-title' >
                        {intl.formatMessage({ id: 'settingsBodyGeneral.countryTitle' })}
                    </span>
                    <span className='st-profile-contacts-value'>
                        {country[intl.formatMessage({ id: 'locale'})][userInfo.country]}
                    </span>
                </div>
                : null}
            {userInfo.email
                ? <div className='st-profile-contacts-line'>
                    <span className='st-profile-contacts-title' >
                        {intl.formatMessage({ id: 'settingsBodyGeneral.emailTitle' })}
                    </span>
                    <span className='st-profile-contacts-value'>
                        {userInfo.email}
                    </span>
                </div>
                : null}
            {userInfo.skype
                ? <div className='st-profile-contacts-line'>
                    <span className='st-profile-contacts-title' >
                        {intl.formatMessage({ id: 'settingsBodyGeneral.skypeTitle' })}
                    </span>
                    <span className='st-profile-contacts-value'>
                        {userInfo.skype}
                    </span>
                </div>
                : null}
            {userInfo.phone
                ? <div className='st-profile-contacts-line'>
                    <span className='st-profile-contacts-title' >
                        {intl.formatMessage({ id: 'settingsBodyGeneral.phoneTitle' })}
                    </span>
                    <span className='st-profile-contacts-value'>
                        {userInfo.phone}
                    </span>
                </div>
                : null}
            {Object.keys(jobs).length !== 0 ? <h2 className="st-contacts-title">{intl.formatMessage({ id: 'profile.job' })}</h2> : null}
            {jobs !== null
                ? (_.map(jobs, (job) =>
                    <div key={job.id}>
                        <JobContacts job={job}/>
                    </div>
                ))
                : (null)}
        </div>
    );
};

ProfileContacts.propTypes = propTypes;

export default injectIntl(ProfileContacts);
