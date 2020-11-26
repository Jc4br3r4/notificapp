import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaccion } from './catmaetransaccion.entity';
import { Cuenta } from '../catmaecuenta/catmaecuenta.entity';
import { AppGateway } from '../../events/app.gateway';
import { UsersOnline } from '../usersonline/usersonline.entity';
import { Notificacion } from '../catmaenotificacion/notificacion.entity';

@Injectable()
export class TransaccionService {

  constructor(@InjectRepository(Transaccion)
              private transaccionRepository: Repository<Transaccion>,
              @InjectRepository(Cuenta)
              private cuentaRepository: Repository<Cuenta>,
              // @Inject() private connection: Connection
              private gateway: AppGateway,
              @InjectRepository(UsersOnline)
              private usersRepository: Repository<UsersOnline>,
              @InjectRepository(Notificacion)
              private notificaacionRepository: Repository<Notificacion>
              ) {}

  async transferenciaTerceros(user: number, data: any) {
    // necesito saber la persona que transfiere a que persona y el monto

    // saber si tiene saldo paara transferir
    const emisor = await this.cuentaRepository.findOne({ where: { persona: user }});

    if(!emisor) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    if(emisor.saldo > data.monto) {
      throw new HttpException('Saldo insuficiente', HttpStatus.FORBIDDEN);
    }

    const receptor = await this.cuentaRepository.findOne({ where: { ncuenta: data.cuenta }})

    if(!receptor) {
      throw new HttpException('Receptor no encontrado', HttpStatus.NOT_FOUND);
    }


    // const queryRunner = this.connection.createQueryRunner();
    // await queryRunner.startTransaction();

    // try {
    //
    //   // disminuye
    //   await this.cuentaRepository.update({ id: emisor.id }, {
    //     saldo: emisor.saldo - data.saldo
    //   })
    //
    //   // aumenta
    //   await this.cuentaRepository.update({ id: receptor.id}, {
    //     saldo: receptor.saldo + data.saldo
    //   })
    //
    //   await queryRunner.commitTransaction();
    //
    //   return await this.cuentaRepository.findOne({ where: { persona: user }});
    //
    // } catch (error) {
    //
    //   await queryRunner.rollbackTransaction();
    //
    // } finally {
    //
    //   await queryRunner.release();
    //
    // }
  }

  async estadoTransferencia(user , resp) {
    // necesito que la transferencia aentre en estado pendiente

    const destino = await this.cuentaRepository.findOne({ where: { ncuenta: resp.destino }})
    const origen = await this.cuentaRepository.findOne({ where: { persona: user, ncuenta: resp.origen }});


    if (resp.origen === resp.destino) {
      throw new HttpException('Cuenta destino y origen no deben ser iguales', HttpStatus.FORBIDDEN);
    }

    if(!origen) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    if(!destino) {
      throw new HttpException('Cuenta destino no encontrada', HttpStatus.NOT_FOUND);
    }

    if(origen.saldo <= resp.monto) {
      throw new HttpException('Saldo insuficiente', HttpStatus.FORBIDDEN);
    }

    const transaccion = await this.transaccionRepository.create({
      origen,
      destino,
      monto: resp.monto,
      descripcion: 'TRAN.CTAS.TERC.BM',
      estado: resp.estado
    });

    await this.transaccionRepository.save(transaccion);

    // notifica al receptor

    await this.notificaTransaccionReceptor(destino);
    await this.notificaTransccionEmisor(origen);


    return true;
  }

  async notificaTransaccionReceptor(receptor) {
    const notificacionEmite = await this.notificaacionRepository.create({
      mensaje: 'Tienes un transferencia pendiente',
      persona: receptor,
      tipo: 'transferencia'
    })

    const rpta = await this.notificaacionRepository.save(notificacionEmite)

    const userOnline = await this.usersRepository.findOne({
      where: { persona: receptor}
    })

    if(userOnline) {
      this.gateway.server.in(userOnline.token).emit('transferencia-pendiente', rpta)
    }

    return rpta;

  }

  async notificaTransccionEmisor(emisor) {
    const notificacionRecibe = await this.notificaacionRepository.create({
      mensaje: 'Su transferencia esta pendiente de aceptacion',
      persona: emisor,
      tipo: 'transferencia'
    })

    const rpta = await this.notificaacionRepository.save(notificacionRecibe)

    const userOnline = await this.usersRepository.findOne({
      where: { persona: emisor}
    })

    if(userOnline) {
      this.gateway.server.in(userOnline.token).emit('transferencia-pendiente', rpta)
    }

    return rpta;
  }

  async saldos(user, id){

    const origen = await this.cuentaRepository.findOne({ where: { persona: user, id }});

    if(!origen) {
      throw new HttpException('La cuenta no existe', HttpStatus.NOT_FOUND);
    }

    return await this.transaccionRepository.createQueryBuilder('transaccion')
      .innerJoinAndSelect('transaccion.origen', 'origen')
      .innerJoinAndSelect('transaccion.destino', 'destino')
      .select([
        'transaccion.monto as monto',
        'transaccion.estado as estado',
        'transaccion.createdAt as created',
        'transaccion.descripcion as descripcion',
        'transaccion.origen as origen',
      ])
      .where( 'origen.id = :origen', { origen: origen.id })
      .orWhere('destino.id = :destino', { destino: origen.id })
      .getRawMany();
  }
}
