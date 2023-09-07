import { createConnection, getConnectionOptions } from "typeorm";

interface IOptions {
    host: string;
}

console.log("Arquivo database");
getConnectionOptions().then((options) => {
    const newOptions = options as IOptions;
    newOptions.host = "database_ignite";
    createConnection({
        ...options,
    });
});
