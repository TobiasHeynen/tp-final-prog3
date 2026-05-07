import { pool } from '../db/conexion.js';

// BROWSE — listar todas las especialidades activas
export const getEspecialidades = async (req, res) => {
    try {
        const sql = 'SELECT * FROM especialidades WHERE activo = 1';
        const [especialidades] = await pool.query(sql);

        res.status(200).json({
            estado: true,
            msg: 'Especialidades obtenidas correctamente',
            data: especialidades
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ estado: false, msg: 'Error interno del servidor' });
    }
};

// READ — obtener una especialidad por ID
export const getEspecialidadById = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?';
        const [especialidades] = await pool.execute(sql, [id]);

        if (especialidades.length === 0) {
            return res.status(404).json({ estado: false, msg: 'Especialidad no encontrada' });
        }

        res.status(200).json({
            estado: true,
            msg: 'Especialidad obtenida correctamente',
            data: especialidades[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ estado: false, msg: 'Error interno del servidor' });
    }
};

// ADD — crear una nueva especialidad
export const createEspecialidad = async (req, res) => {
    try {
        const { nombre } = req.body;
        const sql = 'INSERT INTO especialidades (nombre) VALUES (?)';
        const [result] = await pool.execute(sql, [nombre]);

        if (result.affectedRows > 0) {
            res.status(201).json({
                estado: true,
                msg: `Especialidad creada correctamente`,
                data: { id_especialidad: result.insertId, nombre }
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ estado: false, msg: 'Error interno del servidor' });
    }
};

// EDIT — modificar una especialidad existente
export const updateEspecialidad = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        // Verificar que existe y está activa
        const sqlCheck = 'SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?';
        const [especialidades] = await pool.execute(sqlCheck, [id]);

        if (especialidades.length === 0) {
            return res.status(404).json({ estado: false, msg: 'Especialidad no encontrada' });
        }

        const sql = 'UPDATE especialidades SET nombre = ? WHERE id_especialidad = ?';
        const [result] = await pool.execute(sql, [nombre, id]);

        if (result.affectedRows > 0) {
            res.status(200).json({
                estado: true,
                msg: 'Especialidad modificada correctamente',
                data: { id_especialidad: Number(id), nombre }
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ estado: false, msg: 'Error interno del servidor' });
    }
};

// DELETE — soft delete (activo = 0)
export const deleteEspecialidad = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar que existe y está activa
        const sqlCheck = 'SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?';
        const [especialidades] = await pool.execute(sqlCheck, [id]);

        if (especialidades.length === 0) {
            return res.status(404).json({ estado: false, msg: 'Especialidad no encontrada' });
        }

        const sql = 'UPDATE especialidades SET activo = 0 WHERE id_especialidad = ?';
        const [result] = await pool.execute(sql, [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({
                estado: true,
                msg: 'Especialidad eliminada correctamente'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ estado: false, msg: 'Error interno del servidor' });
    }
};
