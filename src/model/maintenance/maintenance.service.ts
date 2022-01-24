import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Maintenance } from './maintenance.entity';

@Injectable()
export class MaintenanceService {
    constructor(
        @InjectRepository(Maintenance)
        private maintenanceRepository: Repository<Maintenance>) { }
    
    findAll(): Promise<Maintenance[]> {
        return this.maintenanceRepository.find();
    }

    findOne(id: string): Promise<Maintenance> {
        return this.maintenanceRepository.findOne({where: {id_service: id}});
    }

    createTypeMaintenance(data: Maintenance): Promise<Maintenance> {
        return this.maintenanceRepository.save(data);
    }

    deleteTypeMaintenance(data: Maintenance): Promise<Maintenance> {
        return this.maintenanceRepository.remove(data);
    }    
}
