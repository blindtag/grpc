import { CreateUserDto, Empty, PaginationDto, UpdateUserDto, User, Users } from '@app/common';
import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Observable, Subject } from 'rxjs';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class UsersService {
  protected readonly logger =new Logger(UsersRepository.name)
    
  constructor(
      private readonly userRepository:UsersRepository
  ){}
  private readonly users:User[] = [];

  // onModuleInit() {
  //     for(let i=0; i<= 100; i++){
  //       this.create({username:randomUUID(), password: randomUUID(), age:0})
  //     }
  // }
  
  async create(createUserDto: CreateUserDto):Promise<User>{
    // const user:User = {
    //   ...createUserDto,
    //   subscribed:false,
    //   socialMedia:{},
    //   id:randomUUID(),
    // }
    // this.users.push(user)
    // return user;
    return await this.userRepository.create(createUserDto)
  }

  async findAll(request:Empty):Promise<User[]>{
    return this.userRepository.find({});
  }

  async findOne(id: string):Promise<User>{
    return this.userRepository.findOne({id});
  }

  update(id: string, updateUserDto: UpdateUserDto):Promise<User>{
    // const userIndex = this.users.findIndex((user)=> user.id === id);
    // if(userIndex !== -1){
    //   this.users[userIndex] = {
    //     ...this.users[userIndex],
    //     ...updateUserDto
    //   };
    //   return this.users[userIndex];
    //}
    //throw new NotFoundException('User Not Found')
    return this.userRepository.findOneAndUpdate({id}, {
      $set:{updateUserDto}
    })
  }

  remove(_id: string):Promise<any>{
    // const userIndex = this.users.findIndex((user)=> user.id === id);
    // if(userIndex !== -1){
    //   this.users.splice(userIndex)[0]
    //   };
    // throw new NotFoundException('User Not Found')
    return this.userRepository.findOneAndDelete({_id})
  }

  queryUsers(paginationDtoStream:Observable<PaginationDto>):Observable<Users>{
    const subject = new Subject<Users>();
    
    const onNext = (paginationDto:PaginationDto)=>{
      const start = paginationDto.page * paginationDto.skip;
      subject.next({
        users: this.users.slice(start, start + paginationDto.skip)
      })
    }

    const onComplete= ()=> subject.complete();
    paginationDtoStream.subscribe({
      next:onNext,
      complete:onComplete,
    })

    return subject.asObservable();
  }

}
