import { NestFactory } from "@nestjs/core";
import { ClientModule } from "./client.module";
import { CustomHttpExceptionFilter } from "./custom-http-exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(ClientModule);
    app.useGlobalFilters( new CustomHttpExceptionFilter());
    await app.listen(3001);
    console.log("Client is running on: 3001")
}
bootstrap();