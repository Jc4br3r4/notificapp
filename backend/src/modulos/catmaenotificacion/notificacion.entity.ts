import {
  Column, CreateDateColumn,
  Entity, JoinColumn, ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Persona } from '../catmaepersona/catmaepersona.entity';

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
}
