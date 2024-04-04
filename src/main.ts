import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // método agrega prefijo para la API
  app.enableCors({
    origin: true, // Permite todos los orígenes
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true, // Habilita las credenciales (cookies, encabezados de autenticación, etc.)
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      // configuracion para que los Query parametres se lean en modo number y no en string solucionando el choque de informacion
      // tramsforma la informacion que llega los Dtos a la informacion que este espera para su validacion.
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  //Swagger
  const config = new DocumentBuilder()
    .setTitle('test Crud MongoDB with NestJS')
    .setDescription('Api para testear endopoints de mongodb')
    .setVersion('1.0')
    .addTag('#Users')
    .setContact('Eleazar Gamez', 'https://github.com/EleazarGamezD', 'eleazar.gamezd@gmail.com')
    .addServer(`http://localhost:${process.env.PORT}`, 'Servidor Local')
    .build();

  ;
  const swaggerOptions = {
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.13.0/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.13.0/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.13.0/swagger-ui-standalone-preset.js',
    ],
    customFavIcon: 'https://avatars.githubusercontent.com/u/13707038?s=200&v=4',

  }
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document, swaggerOptions);//? se coloca '/' para que swagger sea la web principal !
  await app.listen(process.env.PORT ?? 3000);
  console.log(`App running on Port ${process.env.PORT}`);
}
bootstrap();
