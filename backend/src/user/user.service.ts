import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, In, Repository } from 'typeorm';
import { User, UserStatus } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = new User();
      user.first_name = createUserDto.first_name;
      user.last_name = createUserDto.last_name;
      user.email = createUserDto.email;
      user.status = createUserDto.status || UserStatus.ACTIVE;

      const userData = await this.entityManager.save(user);
      return {
        status: true,
        message: 'User created successfully',
        data: userData,
      };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY' || error.code === '23505') {
        throw new ConflictException({
          status: false,
          message: 'Email already registered in the system',
        });
      }
      throw new BadRequestException({
        status: false,
        message: 'Failed to create user',
      });
    }
  }

  async findAll(page: number = 1, limit: number = 10, status?: UserStatus) {
    try {
      const skip = (page - 1) * limit;

      const query = this.usersRepository.createQueryBuilder('user');

      if (status) {
        query.where('user.status = :status', { status });
      } else {
        query.where('user.status IN (:...statuses)', {
          statuses: [UserStatus.ACTIVE, UserStatus.INACTIVE],
        });
      }

      const [users, total] = await query
        .skip(skip)
        .take(limit)
        .getManyAndCount();

      const totalPages = total > 0 ? Math.ceil(total / limit) : 1;

      return {
        status: true,
        message: 'users List',
        data: {
          total,
          page,
          limit,
          totalPages,
          users,
        },
      };
    } catch (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  }

  async findOne(id: string) {
    const user = await this.entityManager.findOne(User, {
      where: { id, status: In([UserStatus.ACTIVE, UserStatus.INACTIVE]) },
    });

    if (!user) {
      return {
        status: false,
        message: `User not found with the id ${id}.`,
      };
    }

    return { status: true, message: 'User Details', data: user };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userData = await this.findOne(id);
    if (!userData.status) {
      return userData;
    }
    const user = userData.data as User;
    user.first_name = updateUserDto.first_name
      ? updateUserDto.first_name
      : user.first_name;
    user.last_name = updateUserDto.last_name
      ? updateUserDto.last_name
      : user.last_name;
    const updatedUser = await this.entityManager.save(user);
    return {
      statu: true,
      message: 'User updated successfully',
      data: updatedUser,
    };
  }

  async remove(id: string) {
    const userData = await this.findOne(id);
    if (!userData.status) {
      return userData;
    }
    const user = userData.data as User;
    user.status = UserStatus.DEACTIVATED;
    await this.usersRepository.save(user);
    return {
      status: true,
      message: `User with the id ${id} was successfully deactivated.`,
    };
  }
}
