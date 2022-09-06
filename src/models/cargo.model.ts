import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Bloque} from './bloque.model';
import {BloqueCargo} from './bloque-cargo.model';
import {Eleccion} from './eleccion.model';

@model()
export class Cargo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @hasMany(() => Bloque, {through: {model: () => BloqueCargo}})
  bloques: Bloque[];

  @belongsTo(() => Eleccion)
  eleccionId: number;

  constructor(data?: Partial<Cargo>) {
    super(data);
  }
}

export interface CargoRelations {
  // describe navigational properties here
}

export type CargoWithRelations = Cargo & CargoRelations;
