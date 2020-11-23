import {
  Column,
  Entity, JoinColumn, ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Persona } from '../catmaepersona/catmaepersona.entity';

@Entity('users_online')
export class UsersOnline{
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ name: 'clave_web'})
  token: string;

  @ManyToOne(() => Persona, (persona) => persona.id, {
    nullable: true,
  })

  @JoinColumn({ name: 'persona_id' })
    persona: Persona;
}
