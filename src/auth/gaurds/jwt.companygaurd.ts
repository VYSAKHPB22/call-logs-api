import { ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtcompanyGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context: ExecutionContext) {
     const req = context.switchToHttp().getRequest();
   
    
    if (err || !user) {
      throw new UnauthorizedException('Invalid or missing token');
    }

    if (!user.companyCode) {
      throw new ForbiddenException('Access denied. Admins only.');
    }

    return user;
  }
}
