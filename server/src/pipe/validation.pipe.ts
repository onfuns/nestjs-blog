import { ArgumentMetadata, PipeTransform, HttpException, HttpStatus } from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'

export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // 如果没有传入验证规则，则不验证，直接返回数据
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }
    const object = plainToClass(metatype, value)
    const errors = await validate(object)
    if (errors.length > 0) {
      const message = Object.values(errors[0].constraints)[0]
      throw new HttpException(`failed: ${message}`, HttpStatus.BAD_REQUEST)
    }
    return value
  }
  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }
}
