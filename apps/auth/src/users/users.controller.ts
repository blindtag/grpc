import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { 
  CreateUserDto, 
  Empty, 
  FindOneUserDto, 
  PaginationDto, 
  UpdateUserDto, 
  User, 
  UserServiceController, 
  UserServiceControllerMethods, 
  Users,
  
 } from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@UserServiceControllerMethods()
export class UsersController implements UserServiceController {
  constructor(private readonly usersService: UsersService) {}

//  @MessagePattern('createUser')
  createUser(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  async findAllUsers(request:Empty):Promise<User[]> {
  console.log('logger')
    return await this.usersService.findAll(request);
  }

  findOneUser(findOneUserDto: FindOneUserDto) {
    return this.usersService.findOne(findOneUserDto.id);
  }

  updateUser(updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  removeUser(findOneUserDto: FindOneUserDto) {
    return this.usersService.remove(findOneUserDto.id);
  }

  queryUsers(paginationDtoStream: Observable<PaginationDto>){
      return this.usersService.queryUsers(paginationDtoStream)
  }
}
