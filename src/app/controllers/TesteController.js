import {
  addDays,
  format,
  addHours,
  parseISO,
  getDate,
  getMonth,
  getYear,
  isBefore,
  isAfter,
} from 'date-fns';

class TesteController {
  get(req, res) {
    console.log('Na rota de static');
    res.end();
  }

  async index(req, res) {
    const newDate = new Date();

    const date = format(newDate, "yyyy-MM-dd'T'HH:mm:ssxxx");
    const parsedDate = parseISO(date);
    const dateToCompare = addHours(parsedDate, 3);

    //hora de inicio 8horas //add 3 hours
    const compDateStart = addHours(
      new Date(getYear(newDate), getMonth(newDate), getDate(newDate), 8, 0, 0),
      3
    );

    //hora do fim as 18horas
    const compDateEnd = addHours(
      new Date(
        getYear(newDate),
        getMonth(newDate),
        getDate(newDate),
        18,
        0,
        0
      ),
      3
    );

    const horaStart = isAfter(new Date(dateToCompare), new Date(compDateStart));
    const horaEnd = isAfter(new Date(compDateEnd), new Date(dateToCompare));

    let withdrawProduct = false;
    //  if (horaStart && horaEnd) withdrawProduct = true;

    if (horaStart === true && horaEnd === true) {
      let withdrawProduct = true;
      return res.send([
        format(dateToCompare, 'HH:mm'),
        format(compDateStart, 'HH:mm'),
        format(compDateEnd, 'HH:mm'),
        horaStart,
        horaEnd,
        withdrawProduct,
        { dataInico: 'Esta no horário para fazer a retirada' },
      ]);
    }

    return res.send([
      format(dateToCompare, 'HH:mm'),
      { '==========': '============' },
      format(compDateStart, 'HH:mm'),
      format(compDateEnd, 'HH:mm'),
      horaStart,
      horaEnd,
      withdrawProduct,

      { dataInico: 'não esta no horário' },
    ]);
    /*
    return res.send([
      format(dateToCompare, 'HH:mm'),
      format(compDateStart, 'HH:mm'),
      format(compDateEnd, 'HH:mm'),
      horaStart,
      horaEnd,
      withdrawProduct
    ]);*/
  }
}

export default new TesteController();
