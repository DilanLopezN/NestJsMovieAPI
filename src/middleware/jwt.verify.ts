// jwt.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7); // Remove 'Bearer ' prefix
      try {
        const decoded = this.jwtService.verify(token);
        req['user'] = decoded; // Adiciona o payload do token à requisição
        next();
      } catch (error) {
        res.status(401).json({ message: 'Token inválido ou expirado' });
      }
    } else {
      res.status(401).json({ message: 'Token de autenticação não fornecido' });
    }
  }
}
