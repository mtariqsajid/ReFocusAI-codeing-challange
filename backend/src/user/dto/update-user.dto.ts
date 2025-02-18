import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UserStatus } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    first_name?: string | undefined;

    last_name?: string | undefined;

    status?: UserStatus | undefined;
    
}
