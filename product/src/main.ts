import { NestFactory } from "@nestjs/core";
import { ProductModule } from "./product.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3000
      }
    }
  )
  await app.listen();
  console.log("Product service is listening on port 3000");
}

bootstrap();