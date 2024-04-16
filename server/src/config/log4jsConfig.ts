import log4js, {LoggingEvent} from 'log4js';
import colors from 'colors';
import {ENV} from './serverConfig.js';

const getFormattedTime = (date: Date): string => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

log4js.addLayout('custom', function () {
    return function (logEvent: LoggingEvent): string {
        const date = new Date(logEvent.startTime);
        const timestamp = getFormattedTime(new Date(date));
        const level = logEvent.level.levelStr;
        const message = logEvent.data.join(' ');

        const formattedLog = `${timestamp} [${level}] ${message}`;

        switch (level) {
            case 'ERROR':
                return colors.red(formattedLog);
            case 'WARN':
                return colors.yellow(formattedLog);
            case 'INFO':
                return colors.green(formattedLog);
            case 'DEBUG':
                return colors.blue(formattedLog);
            case 'FATAL':
                return colors.magenta(formattedLog);
            case 'TRACE':
                return colors.cyan(formattedLog);
            case 'OFF':
                return colors.grey(formattedLog);
            default:
                return formattedLog;
        }
    };
});

let appenders;
const writePattern = '%d{ISO8601_WITH_TZ_OFFSET} [%p] %m%n';

if (ENV === 'production') {
    appenders = {
        out: {type: 'stdout', layout: {type: 'custom'}},
        app: {
            type: 'dateFile',
            filename: 'logs/application.log',
            pattern: '.yyyy-MM-dd',
            layout: {type: 'pattern', pattern: writePattern},
            daysToKeep: 10
        },
        errorFile: {type: 'file', filename: 'logs/errors.log', layout: {type: 'pattern', pattern: writePattern}},
        errors: {
            type: 'logLevelFilter',
            level: 'ERROR',
            appender: 'errorFile',
            layout: {type: 'pattern', pattern: writePattern}
        }
    };
} else {
    appenders = {
        out: {type: 'stdout', layout: {type: 'custom'}},
        app: {type: 'file', filename: 'logs/application.log', layout: {type: 'pattern', pattern: writePattern}},
        errorFile: {type: 'file', filename: 'logs/errors.log', layout: {type: 'pattern', pattern: writePattern}},
        errors: {
            type: 'logLevelFilter',
            level: 'ERROR',
            appender: 'errorFile',
            layout: {type: 'pattern', pattern: writePattern}
        }
    };
}

const log4jsConfig = {
    appenders: appenders,
    categories: {
        default: {appenders: ['out', 'app', 'errors'], level: ENV === 'production' ? 'INFO' : 'TRACE'},
        http: {appenders: ['out'], level: 'INFO'}
    }
};

log4js.configure(log4jsConfig);

export const log = log4js.getLogger();
export const httpLogger = log4js.getLogger('http');
