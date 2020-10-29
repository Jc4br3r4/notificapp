import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn, ManyToOne,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { Persona } from '../catmaepersona/catmaepersona.entity';

@Entity('catmaetransaccion')
export class Transaccion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal'})
  monto: number;

  @ManyToOne(() => Persona, (persona) => persona.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'receptor_id' })
  receptor: Persona;

  @ManyToOne(() => Persona, (persona) => persona.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'emisor_id' })
  emisor: Persona;

  @CreateDateColumn({ name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at'})
  updatedAt: Date;
}

