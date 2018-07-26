import { Link } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';
const propTypes = {
    job: PropTypes.object.isRequired
};

const JobContacts = (job) => {
    return (
        <div className="st-company-wrap st-margin-bottom-middle">
            <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <div className="st-companies-avatar">
                        {job.job.company_id ? <Link to={`/company/${job.job.company_id}`}>
                            <img src={job.job.avatar_small ? job.job.avatar_small : '/static/images/companyAvatar.png'}/>
                        </Link> : <img src='/static/images/companyAvatar.png'/>
                        }
                    </div>
                    <div className="st-company-info-wrap">
                        {job.job.company_id ? <Link to={`/company/${job.job.company_id}`}>
                            <div className="st-company-name">{job.job.company_name}</div>
                        </Link> : <div className="st-company-name">{job.job.company_name}</div>
                        }
                        <div className="d-flex">
                            {job.job.position ? <div className="st-profile-contacts-title">{job.job.position}</div> : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

JobContacts.propTypes = propTypes;

export default JobContacts;
