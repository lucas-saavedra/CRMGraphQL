import log4js from 'log4js';
log4js.configure({
    appenders: {
        console: { type: 'console' },
        warningFile: { type: 'file', filename: './logs/warn.log' },
        errorsFile: { type: 'file', filename: './logs/error.log' },
    },
    categories: {
        default: {
            appenders: ['console'], level: 'trace'
        },
        info: { appenders: ['console'], level: 'info' },
        error: { appenders: ['console'], level: 'error' },
        /*        warning: { appenders: ['console', 'warningFile'], level: 'warn' },
               error: { appenders: ['console', 'errorsFile'], level: 'error' }, */

    }
});

const infoLog = log4js.getLogger('info');
const errorLog = log4js.getLogger('error');


export {
    infoLog,
    errorLog
}