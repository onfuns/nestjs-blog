import { SetMetadata } from '@nestjs/common'

export const Permission = (...permissions: string[]) => SetMetadata('PERMISSION', permissions)

export const NoPermission = () => SetMetadata('NO_PERMISSION', true)
