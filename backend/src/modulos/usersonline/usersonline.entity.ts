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

  @Column()
  token: string;

  @ManyToOne(() => Persona, (persona) => persona.id, {
    nullable: true,
  })

  @JoinColumn({ name: 'persona_id' })
    persona: Persona;
}
