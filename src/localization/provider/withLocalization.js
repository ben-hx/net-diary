import React, {Component} from 'react';
import {LocalizationTypes} from "../model/LocalizationTypes";
import {IntlProvider} from "react-intl";

const withLocalization = (WrappedComponent) => {
    class LocalizationProvider extends Component {

        getCurrentLocale() {
            return LocalizationTypes[0];
        }

        render() {
            const currentLocale = this.getCurrentLocale();
            return (
                <IntlProvider
                    locale={currentLocale.flag}
                    messages={currentLocale.messages}>
                    <WrappedComponent {...this.props} />
                </IntlProvider>
            );
        }
    }

    return LocalizationProvider;
};

export default withLocalization;
