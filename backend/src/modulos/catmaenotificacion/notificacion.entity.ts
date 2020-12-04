import {
  Column, CreateDateColumn,
  Entity, JoinColumn, ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Persona } from '../catmaepersona/catmaepersona.entity';
import { Transaccion } from '../catmaetransaccion/catmaetransaccion.entity';

@Entity('catmaenotificacion')
export class Notificacion{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column()
  mensaje: string;

  @ManyToOne(() => Persona, (persona) => persona.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'persona_id' })
  persona: Persona;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(() => Transaccion, (transaccion) => transaccion.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'transaccion_id' })
  transaccion: Transaccion;

  @Column({ nullable: true })
  transaccion_id: number

  @Column({ nullable: true })
  created_by: number
}
