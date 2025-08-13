import { Body, Controller, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDto } from './dto/role-dto';

@Controller('api/v1/roles')
export class RolesController {

    constructor(private rolesService: RolesService){}

    @Post()
    createRole(@Body() role: RoleDto){
        return this.rolesService.createRole(role);
    }

}
