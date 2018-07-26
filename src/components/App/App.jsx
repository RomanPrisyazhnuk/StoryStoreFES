import './App.scss';
import '../../utils/select/default.scss';
import '../../utils/react-datetime/react-datetime.css';
import '../../utils/bootstrap/bootstrap.scss';
import 'normalize.css';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import i18nConfig from 'locales';
import PropTypes from 'prop-types';
import React from 'react';
import ru from 'react-intl/locale-data/ru';

addLocaleData([...en, ...ru]);

const propTypes = {
    children: PropTypes.node.isRequired,
    language: PropTypes.string.isRequired
};
const App = ({children, language}) => {
    return (
        <IntlProvider locale={ language } messages={ i18nConfig[language].messages }>
            <div className="s">
                <div className="s-container" >{children}</div>
            </div>
        </IntlProvider>
    );
};
App.propTypes = propTypes;

export default App;
