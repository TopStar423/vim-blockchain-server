import * as path from 'path';
import * as fs from 'fs';
import * as winston from 'winston';
import { LOG_LEVEL, AWS_REGION, CLOUDWATCH_LOG_GROUP_NAME } from '../config/config';
import WinstonCloudWatch from 'winston-cloudwatch';
import express from 'express'
import crypto from 'crypto';
import WinstonCloudwatch from 'winston-cloudwatch';
import httpContext from 'express-http-context';

class VIMWorldLogger {
    /** 
     * @param m_sessionID - Used only at object instantiation time
    */

    private static m_sessionID: string;
    private static m_logger: winston.Logger = winston.createLogger({
        level: LOG_LEVEL,
        levels: winston.config.syslog.levels,
        transports: [
            new winston.transports.File({ filename: 'vim-error.log', level: 'error',format: winston.format.json()}),
            new winston.transports.File({ filename: 'vim-debug.log', level: 'debug',format: winston.format.json() })
        ],
    });

    public static initializeLogger() {

        this.m_sessionID = crypto.createHash('md5').update(new Date().toISOString()).digest('hex');

        this.m_logger.add(new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp()
            )
        }));

        if (process.env.CLOUDWATCH_LOG_INDICATOR) {
            this.m_logger.add(new WinstonCloudWatch({
                level:LOG_LEVEL,
                logGroupName: CLOUDWATCH_LOG_GROUP_NAME,
                logStreamName: function () {
                    let date = new Date().toISOString().split('T')[0];
                    return `${process.env.CLOUDWATCH_LOG_FILE_NAMEPREFIX}-logs-${date}`;
                },
                awsRegion: AWS_REGION,
                awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
                awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
                retentionInDays: process.env.CLOUDWATCH_LOG_RETENTION_DAYS ? Number(process.env.CLOUDWATCH_LOG_RETENTION_DAYS) : 30,
                messageFormatter: (log) => {
                    return `${JSON.stringify({
                        message: log.message,
                        //sessionID: VIMWorldLogger.m_sessionID,
                        sessionID: httpContext.get('reqId') ? httpContext.get('reqId') : VIMWorldLogger.m_sessionID,
                        level: log.level
                    })}`
                }
            }));
        }

        /* if (!appInstance) throw new Error(`Cannot initialize logger. Invalid express.Application instance passed. Logging may not be available`);

        this.m_sessionID = crypto.createHash('md5').update(new Date().toISOString()).digest('hex');
        
        appInstance.use((req, res, next) => {
            //this.m_sessionID = req["sessionID"];
            this.m_logger.clear();
            this.m_logger = winston.createLogger({
                level: LOG_LEVEL,
                levels: winston.config.syslog.levels,
                format: winston.format.json(),
                transports: [
                    new winston.transports.Console({ format: winston.format.simple() }),
                    new winston.transports.File({ filename: 'vim-error.log', level: 'error' }),
                    new winston.transports.File({ filename: 'vim-debug.log', level: 'debug' }),
                    new WinstonCloudWatch({
                        logGroupName: CLOUDWATCH_LOG_GROUP_NAME,
                        logStreamName: function () {
                            let date = new Date().toISOString().split('T')[0];
                            return 'vim-interface-server-logs-' + date;
                        },
                        awsRegion: AWS_REGION,
                        awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
                        awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
                        retentionInDays: process.env.CLOUDWATCH_LOG_RETENTION_DAYS ? Number(process.env.CLOUDWATCH_LOG_RETENTION_DAYS) : 30,
                        messageFormatter: (log) => {
                            return `${JSON.stringify({
                                message: log.message,
                                sessionID: req["sessionID"],
                                level: log.level
                            })}`
                        }
                    })
                ],
            });
            next();
        }); */
    }

    public static info(msg: string): void {
        this.m_logger.info(msg);
    }

    public static emerg(msg: string): void {
        this.m_logger.emerg(msg);
    }

    public static alert(msg: string): void {
        this.m_logger.alert(msg);
    }

    public static crit(msg: string): void {
        this.m_logger.crit(msg);
    }

    public static error(msg: string): void {
        this.m_logger.error(msg);
    }

    public static warning(msg: string): void {
        this.m_logger.warning(msg);
    }

    public static notice(msg: string): void {
        this.m_logger.notice(msg);
    }

    public static debug(msg: string): void {
        this.m_logger.debug(msg);
    }


}

export default VIMWorldLogger;