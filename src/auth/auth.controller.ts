import { Controller, Get, UseGuards, Res, Req} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

@Controller('auth')
export class AuthController {


    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleLogin() {
        // Inicia el flujo de login de google OAuth2
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleLoginCallback(@Req() req, @Res() res) {
        
        // maneja el calback de google OAuth2
        const jwt: string = req.user.jwt;
        if (jwt)
           res.json({
               ok: true,
               msj: 'Loggeado correctamente con google',
               user: req.user
           })
        else 
        res.json({
            ok: false,
            msj: 'Falló el login con google',
        })
    }

    @Get('protected')
    @UseGuards(AuthGuard('jwt'))
    protectedResource() {
        return 'JWT esta funcionando!!!!!!';
    }
}
