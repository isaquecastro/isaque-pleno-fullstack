import "dotenv/config";
import "express-async-errors";

import ServerApp from "./src/app/instances/ServerApp";

const port = process.env.PORT || 3333;

ServerApp.listen(port, () => console.log("> Server running on port " + port));
