import { isObject, IS_DEV } from '@/util'
import { Injectable } from '@nestjs/common'
import * as path from 'path'
import * as winston from 'winston'
import * as DailyRotateFile from 'winston-daily-rotate-file'

@Injectable()
export class LoggerService {
  private logger: winston.Logger
  constructor(appName) {
    this.logger = winston.createLogger({
      level: IS_DEV ? 'silly' : 'info',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        winston.format.colorize(),
        winston.format.printf(({ level, timestamp, message }) => {
          return `[${timestamp}] [${level}] [${appName}]: ${message}`
        }),
      ),
      transports: [
        new DailyRotateFile({
          filename: path.join(process.cwd(), 'logs/error-%DATE%.log'),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          level: 'error',
        }),
        new DailyRotateFile({
          filename: path.join(process.cwd(), 'logs/info-%DATE%.log'),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          handleExceptions: true,
          maxSize: '20m',
          maxFiles: '14d',
          level: 'silly',
        }),
        IS_DEV ? new winston.transports.Console({}) : null,
      ].filter(t => !!t),
    })
  }

  private stringify(...args: any[]): string {
    return args.map(arg => (isObject(arg) ? JSON.stringify(arg) : arg)).join('')
  }

  public error(message: any, data?: any): void {
    this.logger.error(this.stringify(message, data))
  }

  public warn(message: any, data?: any): void {
    this.logger.warn(this.stringify(message, data))
  }

  public info(message: any, data?: any): void {
    this.logger.info(this.stringify(message, data))
  }

  public http(message: any, data?: any): void {
    this.logger.http(this.stringify(message, data))
  }

  public verbose(message: any, data?: any): void {
    this.logger.verbose(this.stringify(message, data))
  }

  public debug(message: any, data?: any): void {
    this.logger.debug(this.stringify(message, data))
  }

  public silly(message: any, data?: any): void {
    this.logger.silly(this.stringify(message, data))
  }
}
