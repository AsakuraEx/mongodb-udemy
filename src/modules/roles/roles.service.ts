import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Role } from './schemas/role.schema';
import { PermissionsService } from '../permissions/permissions.service';
import { RoleDto } from './dto/role-dto';

@Injectable()
export class RolesService {

    constructor(
        @InjectModel(Role.name) private roleModel: Model<Role>,
        private permissionService: PermissionsService
    ){}

    async createRole(role: RoleDto){

        const roleExist = await this.roleModel.findOne({
            name: role.name
        })

        if(roleExist){
            throw new ConflictException('El rol ya existe');
        }

        const permissionRole: Types.ObjectId[] = [];
        if(role.permissions && role.permissions.length > 0){

            for(const permission of role.permissions){
                const permissionFound = await this.permissionService.findPermissionByName(permission.name);
                if(!permissionFound){
                    throw new ConflictException('El permiso no existe');
                }

                permissionRole.push(permissionFound._id);
            }

        }

        const r = new this.roleModel({
            name: role.name,
            permissions: permissionRole
        });

        return r.save();

    }

}
