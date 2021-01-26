import EN from './EN';
import DE from './DE';

export const LocalizationTypes = [
    {
        id: Symbol('en'),
        flag: 'en',
        messages: EN,
        messageId: 'settings.english',
    },
    {
        id: Symbol('de'),
        flag: 'de',
        messages: DE,
        messageId: 'settings.german',
    },
];
