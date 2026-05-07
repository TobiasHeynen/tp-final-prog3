import 'dotenv/config';
import express from 'express';
import { testConexion } from './db/test-conexion.js';
import especialidadesRoutes from './routes/especialidades.routes.js';

const app = express();

// Middlewares globales
app.use(express.json());

// Test de conexión a la base de datos
await testConexion();

// Ruta base de bienvenida
app.get('/', (req, res) => {
    res.status(200).json({ estado: true, msg: 'API Clínica Médica ok' });
});

// Rutas versionadas
app.use('/api/v1/especialidades', especialidadesRoutes);

// Middleware para rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ estado: false, msg: 'Ruta no encontrada' });
});

const PUERTO = process.env.PUERTO || 3000;

app.listen(PUERTO, () => {
    console.log(`Servidor iniciado OK en puerto ${PUERTO}`);
});
