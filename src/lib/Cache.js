import Redis from 'ioredis';
import configRedis from '../config/redis';

class RemoveCaractEspecial {
  constructor() {
    }


  invalidate(key) {
    const res = this.redis.del(key);
  //  this.redis.disconnect();
    return res;
  }

  async invalidatePrefix(prefix) {
    try {
      const keys = await this.redis.keys(`cache:${prefix}:*`);
      const keysWithoutPrefix = keys.map(key => key.replace('cache:', ''));

      console.log('3 Dentro da função invalida o cache:', keysWithoutPrefix);

      this.redis.del(keysWithoutPrefix);
      console.log('Vair retorna');
    //  this.redis.disconnect();
      return;
    } catch (error) {
      console.error('Eroroor:::: ', error);
    }
    //this.redis.disconnect();
  }

  async allKey(prefix) {
    try {
      console.log('socker prefix:', prefix);

      const keys = await this.redis.keys(`cache:${prefix}:*`);
      const keysWithoutPrefix = keys.map(key => key.replace('cache:', ''));

      console.log('3 Dentro da função invalida o cache:', keysWithoutPrefix);

      //this.redis.del(keysWithoutPrefix);
      console.log('Vair retorna');
    //  this.redis.disconnect();

      return keysWithoutPrefix;
    } catch (error) {
      console.error('Eroroor:::: ', error);
    }
    //this.redis.disconnect();
  }
}

export default new RemoveCaractEspecial();
