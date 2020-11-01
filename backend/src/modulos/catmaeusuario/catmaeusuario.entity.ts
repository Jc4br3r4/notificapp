import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity, JoinColumn, ManyToOne,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { Persona } from '../catmaepersona/catmaepersona.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Entity('catmaeusuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'clave_web'})
  claveWeb: string;

  @ManyToOne(() => Persona, (persona) => persona.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'persona_id' })
  persona: Persona;

  @CreateDateColumn({ name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at'})
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.claveWeb = await bcrypt.hashSync(this.claveWeb, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, this.claveWeb);
  }

  async toResponseObject(showToken= true): Promise<Usuario> {
    const { id, persona, token } = this;

    const responseObject: any = { id, persona };

    if (showToken) {
      responseObject.token = token;
    }

    return responseObject;
  }

  private get token() {
    const { id, persona } = this;

    return jwt.sign({ id, persona }, process.env.SECRET, {
      expiresIn: '7d',
    });
  }
}
