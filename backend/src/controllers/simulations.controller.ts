// ============================================================================
// Controlador de Simulações — Rendimento Primor
// ============================================================================

import { Request, Response } from 'express';
import {
  createSimulation as createSimulationService,
  deleteSimulation as deleteSimulationService,
  getSimulationById,
  listSimulations as listSimulationsService,
} from '../services/simulations.service';
import { CreateSimulationInput } from '../types/simulation.types';
import { successResponse } from '../utils/api-response';
import { asyncHandler } from '../utils/async-handler';

/** GET /api/simulations */
export const listSimulations = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    const simulations = await listSimulationsService();
    res.status(200).json(successResponse(simulations));
  },
);

/** GET /api/simulations/:id */
export const getSimulation = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const simulation = await getSimulationById(req.params.id);
    res.status(200).json(successResponse(simulation));
  },
);

/** POST /api/simulations */
export const createSimulation = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const simulation = await createSimulationService(
      req.body as CreateSimulationInput,
    );

    res
      .status(201)
      .json(successResponse(simulation, 'Simulação criada com sucesso.'));
  },
);

/** DELETE /api/simulations/:id */
export const deleteSimulation = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    await deleteSimulationService(req.params.id);

    res
      .status(200)
      .json(
        successResponse(
          { id: req.params.id },
          'Simulação eliminada com sucesso.',
        ),
      );
  },
);
