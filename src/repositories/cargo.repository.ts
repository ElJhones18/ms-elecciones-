import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Cargo, CargoRelations, Bloque, BloqueCargo, Eleccion} from '../models';
import {BloqueCargoRepository} from './bloque-cargo.repository';
import {BloqueRepository} from './bloque.repository';
import {EleccionRepository} from './eleccion.repository';

export class CargoRepository extends DefaultCrudRepository<
  Cargo,
  typeof Cargo.prototype.id,
  CargoRelations
> {

  public readonly bloques: HasManyThroughRepositoryFactory<Bloque, typeof Bloque.prototype.id,
          BloqueCargo,
          typeof Cargo.prototype.id
        >;

  public readonly eleccion: BelongsToAccessor<Eleccion, typeof Cargo.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('BloqueCargoRepository') protected bloqueCargoRepositoryGetter: Getter<BloqueCargoRepository>, @repository.getter('BloqueRepository') protected bloqueRepositoryGetter: Getter<BloqueRepository>, @repository.getter('EleccionRepository') protected eleccionRepositoryGetter: Getter<EleccionRepository>,
  ) {
    super(Cargo, dataSource);
    this.eleccion = this.createBelongsToAccessorFor('eleccion', eleccionRepositoryGetter,);
    this.registerInclusionResolver('eleccion', this.eleccion.inclusionResolver);
    this.bloques = this.createHasManyThroughRepositoryFactoryFor('bloques', bloqueRepositoryGetter, bloqueCargoRepositoryGetter,);
    this.registerInclusionResolver('bloques', this.bloques.inclusionResolver);
  }
}
