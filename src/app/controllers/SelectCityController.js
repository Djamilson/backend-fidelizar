import State from '../models/State';
import City from '../models/City';

class SelectCityController {
  //retorno para o select
  async index(req, res) {
    const { state_id } = req.params;

    const cities = await City.findAll({
      where: { state_id },
      attributes: ['id', 'name', 'state_id'],
      include: [
        {
          model: State,
          as: 'state',
          attributes: ['id', 'name', 'acronym'],
        },
      ],
    });

    const options = cities.map(city => ({
      value: city.id,
      label: city.name,
    }));
    return res.json(options);
  }
}

export default new SelectCityController();
