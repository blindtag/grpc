import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto, PaginationDto, USER_SERVICE_NAME } from '@app/common';
import { UpdateUserDto, UserServiceClient } from '@app/common';
import { AUTH_SERVICE } from './constants';
import { ClientGrpc } from '@nestjs/microservices';
import { ReplaySubject } from 'rxjs';
import { subscribe } from 'diagnostics_channel';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class UsersService implements OnModuleInit {
  private usersService:UserServiceClient;
  
  constructor(@Inject(AUTH_SERVICE) private client:ClientGrpc){}

  onModuleInit() {
      this.usersService = this.client.getService<UserServiceClient>(USER_SERVICE_NAME)
  }

  async create(createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto)
  }

  findAll() {
    console.log('11')
    try {
      return this.usersService.findAllUsers({});
    } catch (error) {
      throw new ExceptionsHandler(error)
    }
  }

  async findOne(id: string) {
    return await this.usersService.findOneUser({id});
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser({id, ...updateUserDto})
  }

  remove(id: string) {
    return this.usersService.removeUser({id})
  }

  emailUsers(){
    const users$ = new ReplaySubject<PaginationDto>()
    users$.next({page:0, skip:25})
    users$.next({page:1, skip:25})
    users$.next({page:2, skip:25})
    users$.next({page:3, skip:25})
    
    users$.complete()
    let chunkNumber = 1
    this.usersService.queryUsers(users$).subscribe(users => {
      console.log('Chunk', chunkNumber, users)
      chunkNumber += 1
    })
  }

}
