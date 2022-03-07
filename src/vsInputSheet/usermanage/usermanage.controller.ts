import { UsermanageDto } from './usermanage.dto';
import { UsermanageService } from './usermanage.service';
const ActiveDirectory = require('activedirectory');
import { Controller, Get, Post, UsePipes, HttpCode, Body, Param, Res } from '@nestjs/common';
import { ValidationPipe } from '../../_shared/validation.pipe'


@Controller('')
export class UsermanageController {
    constructor(private service:UsermanageService){}
    @Get('/:buyer')
    getAllComponents(@Param('buyer') buyer:string){
        return this.service.getAll(buyer);
    }

    @Get('/details/:id')
    getDetails(@Param('id') id:string){
        return this.service.getDetails(id);
    }

    @Post('/authadaccount')
    @HttpCode(200)
    async getCheckuerad(@Body() data, @Res() res) {
        res.connection.setTimeout(0);
        const var_username = data.username.toLowerCase();;
        const var_password = data.password;
        
        var config = { url: 'ldap://col-dc-08.brandixlk.org', baseDN: 'dc=domain,dc=com' };

        var ad = new ActiveDirectory(config);

        // Authenticate
         ad.authenticate(var_username, var_password, function(err, auth) {
                if (err) {
                    
                   return res.send({ Type: "ERROR", Msg : "Oops! User Details are not valid. Please Try again!"});
                }
                else
                {
                    if (auth) {

                        return res.send({Type: 'SUCCESS', username : var_username});
                        
                    }
                    else {

                        return res.send({ Type: "ERROR", Msg : "User Not Found. Please Check your Username and Password Again"});
                    
                    }
                }
                
            });
        
            //return res.send({Type: 'SUCCESS', username : var_username});
    }
    
    @Post()
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    createComponent(@Body() data:UsermanageDto){
        return this.service.create(data);
    }
}
