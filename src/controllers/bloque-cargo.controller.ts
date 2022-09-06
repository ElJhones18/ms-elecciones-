import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Bloque,
BloqueCargo,
Cargo,
} from '../models';
import {BloqueRepository} from '../repositories';

export class BloqueCargoController {
  constructor(
    @repository(BloqueRepository) protected bloqueRepository: BloqueRepository,
  ) { }

  @get('/bloques/{id}/cargos', {
    responses: {
      '200': {
        description: 'Array of Bloque has many Cargo through BloqueCargo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cargo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Cargo>,
  ): Promise<Cargo[]> {
    return this.bloqueRepository.cargos(id).find(filter);
  }

  @post('/bloques/{id}/cargos', {
    responses: {
      '200': {
        description: 'create a Cargo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cargo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Bloque.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cargo, {
            title: 'NewCargoInBloque',
            exclude: ['id'],
          }),
        },
      },
    }) cargo: Omit<Cargo, 'id'>,
  ): Promise<Cargo> {
    return this.bloqueRepository.cargos(id).create(cargo);
  }

  @patch('/bloques/{id}/cargos', {
    responses: {
      '200': {
        description: 'Bloque.Cargo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cargo, {partial: true}),
        },
      },
    })
    cargo: Partial<Cargo>,
    @param.query.object('where', getWhereSchemaFor(Cargo)) where?: Where<Cargo>,
  ): Promise<Count> {
    return this.bloqueRepository.cargos(id).patch(cargo, where);
  }

  @del('/bloques/{id}/cargos', {
    responses: {
      '200': {
        description: 'Bloque.Cargo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Cargo)) where?: Where<Cargo>,
  ): Promise<Count> {
    return this.bloqueRepository.cargos(id).delete(where);
  }
}
