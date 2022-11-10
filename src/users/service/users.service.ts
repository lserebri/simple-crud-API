import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { UserEntity } from '../models/users.entity';
import { IUser } from '../models/users.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async update(updateUser: IUser) {
    const { id, ...user } = updateUser;

    await this.userRepository
      .createQueryBuilder('user')
      .update(user)
      .where({ id: id })
      .execute();
  }

  async delete(id: number) {
    await this.userRepository
      .createQueryBuilder('user')
      .delete()
      .from('user_entity')
      .where({ id: id })
      .execute();
  }

  async get(queryParams: IUser, createdBefore: string): Promise<IUser[]> {
    Object.keys(queryParams).forEach(
      (key) => queryParams[key] === undefined && delete queryParams[key],
    );

    const dateQuery = { createdAt: LessThan(new Date(createdBefore)) };

    return await this.userRepository
      .createQueryBuilder('user')
      .where(
        createdBefore !== undefined
          ? { ...dateQuery, ...queryParams }
          : queryParams,
      )
      .getMany();
  }

  async create(user: IUser) {
    await this.userRepository.save({ ...user });
  }
}
