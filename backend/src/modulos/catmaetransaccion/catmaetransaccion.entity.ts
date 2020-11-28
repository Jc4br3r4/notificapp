import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn, ManyToOne,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { Persona } from '../catmaepersona/catmaepersona.entity';
import { Cuenta } from '../catmaecuenta/catmaecuenta.entity';

@Entity('catmaetransaccion')
export class Transaccion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal'})
  monto: number;

  @Column({  nullable: true })
  descripcion: string;

  @ManyToOne(() => Cuenta, (cuenta) => cuenta.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'origen_id' })
  origen: Cuenta;

  @ManyToOne(() => Cuenta, (cuenta) => cuenta.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'destino_id' })
  destino: Cuenta;

  @Column()
  estado: string;

  @CreateDateColumn({ name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at'})
  updatedAt: Date;
}

