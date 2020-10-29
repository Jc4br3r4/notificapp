import {
  Column,
  Entity, JoinColumn, ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DetalleCompendio } from '../catdetcompendio/catdetcompendio.entity';

@Entity('catmaepersona')
export class Persona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: true })
  nombres: string;

  @Column({ length: 50, nullable: true, name: 'ape_materno' })
  apeMaterno: string

  @Column({ length: 50, nullable: true, name: 'ape_paterno'  })
  apePaterno: string;

  @ManyToOne(() => DetalleCompendio, (detalle) => detalle.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'tipodoc_id' })
  tipoDoc: DetalleCompendio;

  @Column({ length: 10, name: 'num_doc'  })
  numDoc: string;

  @Column({ name: 'fech_nac' })
  fechNac: Date;
}
