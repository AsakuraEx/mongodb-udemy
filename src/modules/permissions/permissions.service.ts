import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Permission } from './schemas/permission.schema';
import { Model } from 'mongoose';
import { PermissionDto } from './dto/permission-dto';
import { UpdatePermissionDto } from './dto/permission-update-dto';

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

    getPermissions(name: string){

        const filter = {}
        if(name){
            filter['name'] = {
                $regex: name.trim(),
                $options: 'i'
            };
        }

        return this.permissionModel.find(filter);
    }

    async updatePermission(updatePermission: UpdatePermissionDto){
        
        const permissionExist = await this.findPermissionByName(updatePermission.originalName)

        const newPermissionExist = await this.findPermissionByName(updatePermission.newName)

        if(permissionExist && !newPermissionExist){

            await permissionExist.updateOne({
                name: updatePermission.newName
            })

            return this.permissionModel.findById(permissionExist._id);

        }

        if(!permissionExist){
            const permission = new  PermissionDto();
            permission.name = updatePermission.originalName;
            return this.createPermission(permission);
        }

        throw new ConflictException('No se puede actualizar el permiso');

    }

    async deletePermission(name: string){
        const permissionExist = await this.findPermissionByName(name)

        if(permissionExist){
            return permissionExist.deleteOne()
        }

        throw new ConflictException('No se pudo eliminar el permiso');
    }

    async findPermissionByName(name: string){
        return await this.permissionModel.findOne({
            name: name
        })
    }

}
