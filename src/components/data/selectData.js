import { FormattedMessage } from 'react-intl';
import React from 'react';
export const optionsAction = [
    { value: 'Buy', label: <FormattedMessage id="createGame.selectLabel.buy" /> },
    { value: 'Sell', label: <FormattedMessage id="createGame.selectLabel.sell" />}
];
export const optionsForecast = [
    { value: '900', label: <FormattedMessage id="createGame.selectLabel.15m" /> },
    { value: '1800', label: <FormattedMessage id="createGame.selectLabel.30m" /> },
    { value: '3600', label: <FormattedMessage id="createGame.selectLabel.1h" /> },
    { value: '14400', label: <FormattedMessage id="createGame.selectLabel.4h" /> },
    { value: '28800', label: <FormattedMessage id="createGame.selectLabel.8h" /> },
    { value: '86400', label: <FormattedMessage id="createGame.selectLabel.24h" /> },
    { value: '604800', label: <FormattedMessage id="createGame.selectLabel.1week" /> },
    { value: 'Custom', label: <FormattedMessage id="createGame.selectLabel.custom" /> }
];
export const optionsPrivacy = [
    { value: 'Public', label: <FormattedMessage id="createGame.selectLabel.public" />, image: '/static/images/icons/public_game.svg' },
    { value: 'Private', label: <FormattedMessage id="createGame.selectLabel.private" />, image: '/static/images/icons/private_game.svg' }
];

export const optionsPlatform = [
    { value: 'umarkets', label: 'Umarkets' },
    { value: 'maximarkets', label: 'Maximarkets' }
];

export const optionsChartType = [
    { value: 'Line', label: 'Line' },
    { value: 'Candle', label: 'Candle' }
];

export const optionsPrice = [
    { value: 'Sell', label: 'Bid Price' },
    { value: 'Buy', label: 'Ask Price' }
];

export const optionsTimeScale = [
    { value: 'MINUTE', label: '1m' },
    { value: 'MINUTE5', label: '5m' },
    { value: 'MINUTE15', label: '15m' },
    { value: 'MINUTE30', label: '30m' },
    { value: 'HOUR', label: '1h' },
    { value: 'HOUR4', label: '4h' },
    { value: 'HOUR8', label: '8h' },
    { value: 'DAY', label: '1d' },
    { value: 'WEEK', label: '1w' },
    { value: 'MONTH', label: '1M' }
];
export const optionsPeriod = [
    { value: 'LAST_7_DAYS', label: <FormattedMessage id="dealsSelect.last7Days" />},
    { value: 'TODAY', label: <FormattedMessage id="dealsSelect.today" />},
    { value: 'YESTERDAY', label: <FormattedMessage id="dealsSelect.yesterday" />},
    { value: 'FROM_MONTH_BEGINNING', label: <FormattedMessage id="dealsSelect.fromMonthBeginning" />},
    { value: 'LAST_MONTH', label: <FormattedMessage id="dealsSelect.lastMonth" />},
    { value: 'LAST_30_DAYS', label: <FormattedMessage id="dealsSelect.last30Days" />},
    { value: 'LAST_60_DAYS', label: <FormattedMessage id="dealsSelect.last60Days" />},
    { value: 'LAST_90_DAYS', label: <FormattedMessage id="dealsSelect.last90Days" />},
    { value: 'LAST_3_MONTHS', label: <FormattedMessage id="dealsSelect.last3Months" />},
    { value: 'LAST_6_MONTHS', label: <FormattedMessage id="dealsSelect.last6Months" />}
    // { value: 'ALL_TIME', label: <FormattedMessage id="dealsSelect.allTime" />}
];
export const optionsFieldsPrivacy = [
    { value: 'all', label: <FormattedMessage id="settingsPrivacySelect.all" />},
    { value: 'followers', label: <FormattedMessage id="settingsPrivacySelect.followers" />},
    { value: 'hidden', label: <FormattedMessage id="settingsPrivacySelect.hidden" />}
];
export const optionsFieldsInvitePrivacy = [
    { value: 'allow', label: <FormattedMessage id="settingsPrivacySelect.allow" />},
    { value: 'confirmation', label: <FormattedMessage id="settingsPrivacySelect.confirmation" />},
    { value: 'forbid', label: <FormattedMessage id="settingsPrivacySelect.forbid" />}
];
