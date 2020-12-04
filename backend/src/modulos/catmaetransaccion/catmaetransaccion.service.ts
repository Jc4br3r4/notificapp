import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaccion } from './catmaetransaccion.entity';
import { Cuenta } from '../catmaecuenta/catmaecuenta.entity';
import { AppGateway } from '../../events/app.gateway';
import { UsersOnline } from '../usersonline/usersonline.entity';
import { Notificacion } from '../catmaenotificacion/notificacion.entity';
import { Persona } from '../catmaepersona/catmaepersona.entity';

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

    const destino = await this.cuentaRepository.findOne({ where: { ncuenta: resp.destino }, relations: [ 'persona']})
    const origen = await this.cuentaRepository.findOne({ where: { persona: user, ncuenta: resp.origen }, relations: [ 'persona']});


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

    await this.notificaTransaccionReceptor(user.id,destino, 'Su transferencia esta pendiente de aceptacion', transaccion);
    await this.notificaTransccionEmisor(user.id,origen, 'Tienes un transferencia pendiente', transaccion);

    return true;
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
      .orderBy('transaccion.created_at', 'DESC')
      .getRawMany();
  }

  async propiasCuentas(user , resp) {

    const destino: Cuenta = await this.cuentaRepository.findOne({ where: { persona: user, ncuenta: resp.destino }})
    const origen: Cuenta = await this.cuentaRepository.findOne({ where: { persona: user, ncuenta: resp.origen }});

    if (resp.origen === resp.destino) {
      throw new HttpException('Cuenta destino y origen no deben ser iguales', HttpStatus.FORBIDDEN);
    }

    if(!origen) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    if(!destino) {
      throw new HttpException('Cuenta destino no encontrada', HttpStatus.NOT_FOUND);
    }

    const transaccion = await this.transaccionRepository.create({
      origen,
      destino,
      monto: resp.monto,
      descripcion: 'TRAN.CTAS.PROP.WEB',
      estado: 'C'
    });

    await this.transaccionRepository.save(transaccion);
    await this.cuentaRepository.update({ id: origen.id }, { saldo: parseFloat(String(origen.saldo)) - resp.monto })
    await this.cuentaRepository.update({ id: destino.id}, { saldo: parseFloat(String(destino.saldo)) + resp.monto })

    return true;
  }

  async verTransferenciaPendiente(id) {
    return await this.transaccionRepository.createQueryBuilder('transaccion')
      .innerJoinAndSelect('transaccion.origen', 'origen')
      .innerJoinAndSelect('origen.persona', 'persona')
      .select([
        'transaccion.descripcion as descripcion',
        'transaccion.monto as monto',
        'transaccion.created_at as createdat',
        'transaccion.estado as estado',
        'persona.ape_materno as materno',
        'persona.ape_paterno as paterno',
        'persona.nombres as nombres'
      ])
      .where('transaccion.id = :id', { id })
      .getRawOne();
  }

  async cambiaEstadoTransferencia(user, data) {
    const { id, estado } = data
    const transaccion = await this.transaccionRepository.findOne({ where: { id, destino: user }, relations: ['destino', 'origen']})

    if(transaccion) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    await this.transaccionRepository.update({ id}, { estado })

    await this.notificaTransaccionReceptor(transaccion.origen, 'Tienes una confirmacion pendiente', transaccion);
    await this.notificaTransccionEmisor(transaccion.destino, 'La cuenta origen debe confirmar la transacion', transaccion);

    return true
  }

  async createNotifacionTranasccion(owner: number, persona: Persona, mensaje: string, transaccion?) {

    const notifica = await this.notificaacionRepository.create({
      tipo: 'transferencia',
      mensaje: mensaje,
      transaccion: transaccion,
      created_by: owner,
      persona: persona,
    });

    return await this.notificaacionRepository.save(notifica);
  }

  async notificaTransaccionReceptor(owner,receptor, mensaje, transaccion?) {
    const rpta = await this.createNotifacionTranasccion(owner,receptor.persona, mensaje,transaccion);

    const userOnline = await this.usersRepository.findOne({
      where: { persona: receptor}
    })

    if(userOnline) {
      this.gateway.server.in(userOnline.token).emit('transferencia-pendiente', rpta)
    }

    return rpta;

  }

  async notificaTransccionEmisor(owner,emisor, mensaje, transaccion?) {

    const rpta = await this.createNotifacionTranasccion(owner,emisor.persona,mensaje,transaccion);

    const userOnline = await this.usersRepository.findOne({
      where: { persona: emisor}
    })

    if(userOnline) {
      this.gateway.server.in(userOnline.token).emit('transferencia-pendiente', rpta)
    }

    return rpta;
  }
}
