import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
  const request = context.switchToHttp().getRequest();
    
    try {
      const authHeader = request.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedException('Token is missing');
      }
      
      const token = authHeader.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException('Token is missing');
      }
      
      const user = this.jwtService.verify(token);
      request.user = user;
      
      return true;
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Token is invalid or expired',
        error: error.message,
      });
    }
  }
}
