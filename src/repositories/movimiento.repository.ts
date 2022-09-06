import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Movimiento, MovimientoRelations, Candidato} from '../models';
import {CandidatoRepository} from './candidato.repository';

export class MovimientoRepository extends DefaultCrudRepository<
  Movimiento,
  typeof Movimiento.prototype.id,
  MovimientoRelations
> {

  public readonly condidatos: HasManyRepositoryFactory<Candidato, typeof Movimiento.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CandidatoRepository') protected candidatoRepositoryGetter: Getter<CandidatoRepository>,
  ) {
    super(Movimiento, dataSource);
    this.condidatos = this.createHasManyRepositoryFactoryFor('condidatos', candidatoRepositoryGetter,);
    this.registerInclusionResolver('condidatos', this.condidatos.inclusionResolver);
  }
}
