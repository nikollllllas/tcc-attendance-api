import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { AppModule } from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

const URLS = ["http://localhost:5173", "https://tcc-attendance.netlify.app"]

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  )

  app.enableCors({
    origin: URLS,
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

  await app.listen(process.env.PORT || 3000)
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
