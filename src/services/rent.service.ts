// Services
import BaseService from './base.service';

// Types
import { RentType,CreateRentType} from 'common/types/Rent.type';

class RentServices extends BaseService {
  async getAllRents(): Promise<RentType[]> {
    const res = await this.axios.get('');
    return res.data
  }
  async createRent(rent: CreateRentType): Promise<RentType>{
    const res = await this.axios.post('', rent);
    return res.data
  }
  async updateRent(id: string){
    const res = await this.axios.patch('', id);
    return res.data
  }
  async deleteRent(id: string){
    const res = await this.axios.delete('', );
    return res.data
  }
}


const rentsServices = new RentServices();

export default rentsServices;

