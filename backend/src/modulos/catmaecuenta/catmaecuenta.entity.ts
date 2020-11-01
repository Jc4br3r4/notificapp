import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn, ManyToOne,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { Persona } from '../catmaepersona/catmaepersona.entity';
import { DetalleCompendio } from '../catdetcompendio/catdetcompendio.entity';

@Entity('catmaecuenta')
export class Cuenta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tarjeta: string;

  @Column()
  clave: number;

  @Column()
  saldo: number;

  @ManyToOne(() => Persona, (persona) => persona.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'persona_id' })
  persona: Persona;

  @ManyToOne(() => DetalleCompendio, (detalle) => detalle.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'tipotarjeta_id' })
  tipoTarjeta: DetalleCompendio;


  @CreateDateColumn({ name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at'})
  updatedAt: Date;
}
