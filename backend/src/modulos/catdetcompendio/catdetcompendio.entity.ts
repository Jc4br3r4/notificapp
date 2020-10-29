import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Compendio } from '../catmaecompendio/catmaecompendio.entity';


@Entity('catdetcompendio')
@Unique('UQ_NAMES', ['nombre','compendio'])
export class DetalleCompendio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: true })
  nombre: string;

  @Column({ default: true })
  flag: boolean;

  @ManyToOne(() => Compendio, (compendio) => compendio.id)
  @JoinColumn({ name: 'compendio_id' })
  compendio: Compendio;
}
