const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const { bookRoutes, borrowRoutes, authRoutes } = require('./src/routes');
const swaggerDocument = require('./swagger/swagger.json');

const app = express();
app.use(express.json());

const corsOptions = {
  origin: process.env.DEFAULT_DOMAIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};
app.use(cors(corsOptions));

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/books', bookRoutes);
app.use('/borrowers', borrowRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
