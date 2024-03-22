import { AbstractRepository } from "@app/common/database";
import { UsersDocument } from "../entity/users.entity";
import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UsersRepository extends AbstractRepository<UsersDocument>{
    protected readonly logger = new Logger(UsersRepository.name);
    
    constructor(@InjectModel(UsersDocument.name) userModel:Model<UsersDocument>){
        super(userModel)
    }

}