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
              // @Inject() private connection: Connection,
              private gateway: AppGateway,
              @InjectRepository(UsersOnline)
              private usersRepository: Repository<UsersOnline>,
              @InjectRepository(Notificacion)
              private notificaacionRepository: Repository<Notificacion>
              ) {}

  async transferenciaTerceros(id) {
    // necesito saber la persona que transfiere a que persona y el monto
    const transaccion = await this.transaccionRepository.findOne({ where: { id, estado: 'E' }, relations: ['destino', 'origen']})

    // saber si tiene saldo paara transferir
    const emisor = await this.cuentaRepository.findOne({ where: { id: transaccion.origen.id }});

    const receptor = await this.cuentaRepository.findOne({ where: { id: transaccion.destino.id }})

      // disminuye
      await this.cuentaRepository.update({ id: emisor.id }, {
        saldo: parseFloat(String(emisor.saldo)) - parseFloat(String(transaccion.monto))
      })

      // aumenta
      await this.cuentaRepository.update({ id: receptor.id}, {
        saldo: parseFloat(String(receptor.saldo)) + parseFloat(String(transaccion.monto))
      })

      const userOnline = await this.usersRepository.findOne({
        where: { persona: receptor}
      })

      if(userOnline) {
        const receptorOnline = await this.cuentaRepository.find({
          where: {persona: receptor},
          select: ['id', 'saldo', 'cci', 'tipoTarjeta', 'ncuenta', 'moneda'],
          relations: ['tipoTarjeta', 'moneda'],
        })

        this.gateway.server.in(userOnline.token).emit('transferencia-completada-receptor', receptorOnline)
      }
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

    console.log('EMISOR')
    console.log(origen)
    console.log('RECEPTOR')
    console.log(destino)
    await this.notificaTransaccionReceptor(user.id,destino, 'Tienes un transferencia pendiente',resp.estado, transaccion);
    await this.notificaTransccionEmisor(user.id,origen, 'Su transferencia esta pendiente de aceptacion',resp.estado,  transaccion);

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

  async confirmarEstadoTransferencia(user, data) {
    const { id, estado } = data
    const transaccion = await this.transaccionRepository.findOne({ where: { id, estado: 'E' }, relations: ['destino', 'origen', 'destino.persona', 'origen.persona']})

    if(!transaccion) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    await this.transferenciaTerceros(id);

    const notifica = await this.notificaacionRepository.find({ where: { transaccion_id: id, estado: 'E' }});

    if(notifica.length > 0) {
      for(const noti of notifica) {
        await this.notificaacionRepository.update({ id: noti.id }, { show: false })
      }
    }

    await this.transaccionRepository.update({
      id
    }, { estado: 'C'})

    await this.notificaTransaccionReceptor(user.id,transaccion.origen, 'La transferencia fue completada', estado);
    await this.notificaTransccionEmisor(user.id, transaccion.destino, 'La transferencia fue completada', estado);

    return true;
  }

  async cambiaEstadoTransferencia(user, data) {
    const { id, estado } = data
    const transaccion = await this.transaccionRepository.findOne({ where: { id }, relations: ['destino', 'origen', 'destino.persona', 'origen.persona']})


    // cambiar show notificacion

    if(!transaccion) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    let nuevoEstado;
    if(estado === 'E') {
      nuevoEstado = 'P'
    } else if(estado === 'C') {
      nuevoEstado = 'E'
    }

    const notifica = await this.notificaacionRepository.find({ where: { transaccion_id: id, estado: nuevoEstado }});

    if(notifica.length > 0) {
      for(const noti of notifica) {
        await this.notificaacionRepository.update({ id: noti.id }, { show: false})
      }
    }

    await this.transaccionRepository.update({ id}, { estado })

    await this.notificaTransaccionReceptor(user.id,transaccion.origen, 'Tienes una confirmacion pendiente', estado, transaccion);
    await this.notificaTransccionEmisor(user.id, transaccion.destino, 'La cuenta origen debe confirmar la transacion', estado, transaccion);

    return true
  }

  async createNotifacionTranasccion(owner: number, persona: Persona, mensaje: string, estado,  transaccion?) {

    const notifica = await this.notificaacionRepository.create({
      tipo: 'transferencia',
      mensaje: mensaje,
      transaccion: transaccion,
      created_by: owner,
      estado: estado,
      persona: persona,
    });

    return await this.notificaacionRepository.save(notifica);
  }

  async notificaTransaccionReceptor(owner,receptor, mensaje, estado, transaccion?) {
    await this.createNotifacionTranasccion(owner,receptor.persona, mensaje, estado,transaccion);

    const userOnline = await this.usersRepository.findOne({
      where: { persona: receptor.persona}
    })

    const mostrecent = await this.notificaacionRepository.find({
      select: ['id','transaccion_id','tipo', 'mensaje', 'created', 'created_by', 'show', 'estado'],
      where: { persona: receptor.persona },
      take: 5,
      order: { created: 'DESC'}
    });

    if(userOnline) {
      console.log('NOTIFICA receptor');
      console.log(userOnline)
      console.log(receptor);
      this.gateway.server.in(userOnline.token).emit('transferencia-pendiente', mostrecent)
    }
    return mostrecent;
  }

  async notificaTransccionEmisor(owner,emisor, mensaje,estado, transaccion?) {

    await this.createNotifacionTranasccion(owner, emisor.persona, mensaje, estado, transaccion);

    const userOnline = await this.usersRepository.findOne({
      where: { persona: emisor.persona}
    })

    const mostrecent = await this.notificaacionRepository.find({
      select: ['id','transaccion_id','tipo', 'mensaje', 'created', 'created_by', 'show', 'estado'],
      where: { persona: emisor.persona },
      take: 5,
      order: { created: 'DESC'}
    });

    if(userOnline) {
      console.log('NOTIFICA emisor');
      console.log(userOnline)
      console.log(emisor);
      this.gateway.server.in(userOnline.token).emit('transferencia-pendiente', mostrecent)
    }

    return mostrecent;
  }

  async verConfirmacionTransfernecia(id) {
    return await this.transaccionRepository.createQueryBuilder('transaccion')
      .innerJoinAndSelect('transaccion.destino', 'destino')
      .innerJoinAndSelect('destino.persona', 'persona')
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

  async cancelarTransferencia() {

  }
}
