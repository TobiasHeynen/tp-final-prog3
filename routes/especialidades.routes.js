import { Router } from 'express';
import { check, param } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos.js';
import {
    getEspecialidades,
    getEspecialidadById,
    createEspecialidad,
    updateEspecialidad,
    deleteEspecialidad
} from '../controllers/especialidades.controller.js';

const router = Router();

// GET /api/v1/especialidades — listar todas
router.get('/', getEspecialidades);

// GET /api/v1/especialidades/:id — obtener una
router.get(
    '/:id',
    [
        param('id', 'El ID debe ser un número entero').isInt({ min: 1 }),
        validarCampos
    ],
    getEspecialidadById
);

// POST /api/v1/especialidades — crear
router.post(
    '/',
    [
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('nombre', 'El nombre no debe superar los 120 caracteres').isLength({ max: 120 }),
        validarCampos
    ],
    createEspecialidad
);

// PUT /api/v1/especialidades/:id — editar
router.put(
    '/:id',
    [
        param('id', 'El ID debe ser un número entero').isInt({ min: 1 }),
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('nombre', 'El nombre no debe superar los 120 caracteres').isLength({ max: 120 }),
        validarCampos
    ],
    updateEspecialidad
);

// DELETE /api/v1/especialidades/:id — soft delete
router.delete(
    '/:id',
    [
        param('id', 'El ID debe ser un número entero').isInt({ min: 1 }),
        validarCampos
    ],
    deleteEspecialidad
);

export default router;
