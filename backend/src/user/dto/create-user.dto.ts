import { UserStatus } from '../entities/user.entity';

export class CreateUserDto {
  first_name: string;

  last_name: string;

  email: string;
  
  status?: UserStatus;
}
