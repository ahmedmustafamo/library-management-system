const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const { bookRoutes, borrowRoutes, authRoutes } = require('./src/routes');
const swaggerDocument = require('./swagger/swagger.json');
const createTables = require('./src/utils/createDb')

const app = express();
app.use(express.json());

// const corsOptions = {
//   origin: process.env.DEFAULT_DOMAIN,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
// };
app.use(cors());

// create DB tables if not created
createTables()

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Routes
app.use('/books', bookRoutes);
app.use('/borrowers', borrowRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
