//import { AbstractDocument } from "@app/common/database";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({versionKey:false})
export class UsersDocument  {
    @Prop()
    _id:string;
    @Prop()
    username:string;
    @Prop()
    password:string;
    @Prop()
    email:string
    @Prop()
    age:number;
    @Prop()
    subscribed:boolean;
    // @Prop({type:String})
    // socialMedia:{};

}


export const UsersSchema = SchemaFactory.createForClass(UsersDocument)