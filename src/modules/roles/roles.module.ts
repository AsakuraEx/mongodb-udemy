import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, roleSchema } from './schemas/role.schema';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Role.name,
        schema: roleSchema
      }
    ]),
    PermissionsModule
  ],
  providers: [RolesService],
  controllers: [RolesController]
})
export class RolesModule {}
