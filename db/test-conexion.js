import { pool } from './conexion.js';

export async function testConexion() {
    try {
        const connection = await pool.getConnection();
        console.log('Conexión a la base de datos OK');

        const [results] = await connection.query('SELECT NOW() AS hora_servidor, DATABASE() AS base_datos');
        console.log('Datos de prueba:');
        console.table(results);

        connection.release();
    } catch (error) {
        console.error('Error al conectarse a la base de datos:');
        console.error({
            codigo: error.code,
            msg: error.message,
        });
        process.exit(1);
    }
}
