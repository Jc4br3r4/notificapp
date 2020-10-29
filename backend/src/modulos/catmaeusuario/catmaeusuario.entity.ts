import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn, ManyToOne,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { Persona } from '../catmaepersona/catmaepersona.entity';

@Entity('catmaeusuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'clave_web'})
  claveWeb: number;

  @ManyToOne(() => Persona, (persona) => persona.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'persona_id' })
  persona: Persona;

  @CreateDateColumn({ name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at'})
  updatedAt: Date;
}
