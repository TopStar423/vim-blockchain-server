import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

export class SwaggerRoutes {

    public routes(app: any): void {
        const options = {
            definition: {
                openapi: "3.0.0",
                info: {
                    title: "LogRocket Express API with Swagger",
                    version: "0.1.0",
                    description:
                        "This is a simple CRUD API application made with Express and documented with Swagger",
                    license: {
                        name: "MIT",
                        url: "https://spdx.org/licenses/MIT.html",
                    },
                    contact: {
                        name: "LogRocket",
                        url: "https://logrocket.com",
                        email: "info@email.com",
                    },
                },
                servers: [
                    {
                        url: "http://localhost:3000/books",
                    },
                ],
            },
            apis: ["./routes/books.js"],
        };
        const specs = swaggerJsdoc(options);
        app.use(
            "/api-docs",
            swaggerUi.serve,
            swaggerUi.setup(specs)
        );
    }
}