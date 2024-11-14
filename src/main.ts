import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { AppModule } from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  )

  app.enableCors({
    origin: "http://localhost:5173",
    maxAge: 3600,
    allowedHeaders: ["token", "content-type"],
    credentials: true,
  })

  const config = new DocumentBuilder()
    .setTitle("Attendance API")
    .addSecurity("token", { name: "token", in: "header", type: "apiKey" })
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("swagger", app, document)

  await app.listen(3000)
}
bootstrap()
