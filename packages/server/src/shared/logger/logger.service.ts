import { IS_DEV, isObject } from '@/util'
import { Injectable } from '@nestjs/common'
import * as path from 'path'
import * as winston from 'winston'
import * as DailyRotateFile from 'winston-daily-rotate-file'

@Injectable()
export class LoggerService {
  private logger: winston.Logger
  constructor(serviceName: string) {
    this.logger = this.createLogger(serviceName)
  }

  private createLogger(serviceName: string) {
    return winston.createLogger({
      level: IS_DEV ? 'silly' : 'info',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        winston.format.colorize(),
        winston.format.printf(({ level, timestamp, message }) => {
          return `[${timestamp}] [${level}] [${serviceName}]: ${message}`
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

  private stringify(args: any[]): string {
    return args.map(arg => (isObject(arg) ? JSON.stringify(arg) : arg)).join('')
  }

  public error(...args: any[]) {
    this.logger.error(this.stringify(args))
  }

  public warn(...args: any[]) {
    this.logger.warn(this.stringify(args))
  }

  public info(...args: any[]) {
    this.logger.info(this.stringify(args))
  }

  public http(...args: any[]) {
    this.logger.http(this.stringify(args))
  }

  public verbose(...args: any[]) {
    this.logger.verbose(this.stringify(args))
  }

  public debug(...args: any[]) {
    this.logger.debug(this.stringify(args))
  }

  public silly(...args: any[]) {
    this.logger.silly(this.stringify(args))
  }
}
