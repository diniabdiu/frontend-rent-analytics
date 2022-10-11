// Services
import BaseService from './base.service';

// Types
import { RentType } from 'common/types/Rent.type';

class RentServices extends BaseService {
  async get(): Promise<RentType[]> {
    const res = await this.axios.get('/');
    return res.data
  }
}


const rentServices = new RentServices();

export default rentServices;

