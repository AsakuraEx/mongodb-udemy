import { Body, Controller, Post } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionDto } from './dto/permission-dto';

@Controller('api/v1/permissions')
export class PermissionsController {

    constructor(private permissionService: PermissionsService) {}


    @Post()
    createPermission(@Body() permission: PermissionDto){
        return this.permissionService.createPermission(permission)
    }

}
