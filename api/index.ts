import app from "../src/app";
import { sequelize } from "../src/db/db";

sequelize.sync({ alter: true }).then(() => {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, async () => {
    console.log(`Server listening at port: ${PORT}`);
  });
});

//
