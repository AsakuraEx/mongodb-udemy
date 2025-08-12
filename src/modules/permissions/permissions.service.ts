import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Permission } from './schemas/permission.schema';
import { Model } from 'mongoose';
import { PermissionDto } from './dto/permission-dto';

@Injectable()
export class PermissionsService {

    constructor(
        @InjectModel(Permission.name) private permissionModel: Model<Permission>
    ){}

    async createPermission(permission: PermissionDto){

        const permissionExist = await this.permissionModel.findOne({
            name: permission.name
        })
        console.log(permissionExist)

        if(permissionExist){
            throw new ConflictException('El permiso existe...');
        }

        const p = new this.permissionModel(permission);
        
        return p.save();

    }

    getPermissions(){
        return this.permissionModel.find();
    }

}
