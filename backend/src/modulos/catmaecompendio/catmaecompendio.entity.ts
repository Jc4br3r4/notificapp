import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('catmaecompendio')
export class Compendio {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 50 })
  nombre: string;

  @Column({ default: true })
  flag: boolean;
}
