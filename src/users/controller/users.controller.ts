import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiQuery } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/CreateUser.dto';
import { UpdateUserDto } from '../dto/UpdateUser.dto';
import { UserParamDto } from '../dto/UserParam.dto';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UseGuards(AuthGuard('api-key'))
  async create(@Body() createUser: CreateUserDto) {
    await this.usersService.create(createUser);
  }

  @Get()
  @ApiQuery({ name: 'firstName', required: false, type: String })
  @ApiQuery({ name: 'lastName', required: false, type: String })
  @ApiQuery({ name: 'createdBefore', required: false, type: Date })
  async get(
    @Query('firstName') firstName?: string,
    @Query('lastName') lastName?: string,
    @Query('createdBefore') createdBefore?: string,
  ) {
    return await this.usersService.get(
      {
        firstName,
        lastName,
      },
      createdBefore,
    );
  }

  @Put(':id')
  @UseGuards(AuthGuard('api-key'))
  async update(
    @Body() updateUser: UpdateUserDto,
    @Param() params: UserParamDto,
  ) {
    this.usersService.update({
      ...params,
      ...updateUser,
    });
  }

  @UseGuards(AuthGuard('api-key'))
  @Delete(':id')
  async delete(@Param() params: UserParamDto) {
    this.usersService.delete(params.id);
  }
}
