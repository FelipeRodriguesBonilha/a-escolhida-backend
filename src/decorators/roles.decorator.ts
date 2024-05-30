import { SetMetadata } from '@nestjs/common';
import { TypesRoles } from 'src/user/enums/typesRoles.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: TypesRoles[]) => SetMetadata(ROLES_KEY, roles);