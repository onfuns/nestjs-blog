import { IsNotEmpty } from 'class-validator'
export class CreateDto {
  @IsNotEmpty({ message: '文章标题不能为空' })
  readonly title: string

  @IsNotEmpty({ message: '文章内容不能为空' })
  readonly content: string
}

export class UpdateDto {
  @IsNotEmpty({ message: 'id不能为空' })
  readonly id: string
}
