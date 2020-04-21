import File from '../models/File';
import Group from '../models/Group';
import GroupUser from '../models/GroupUser';

class AcceptRegulationController {
  async store(req, res) {
    //const { newPrivacy, deliveryman_id } = req.query;

    //console.log('newPrivacy, deliveryman_id', newPrivacy, deliveryman_id);

   // const deliverymanExist = await SearchDeliverymanIdService.run({
  //    id: deliveryman_id,
//    });

    //const { id, person_id, person } = deliverymanExist;
    //await person.update({ privacy: newPrivacy });

   // console.log('deliverymanExist:', deliverymanExist);
    // const {id, person_id, person} = deliverymanExist
    // const d =  {user: { id, person_id, person: { ...person, privacy: !privacy } }},
    //console.log('deliverymanExist:', d);
    /*{
      user: {
        id,
        person_id,
        person: { ...person,  },
      },
    }*/
/*
    const { id: idPerson, name, status, avatar } = person;

    const newDeliveryman = await SearchDeliverymanIdService.run({
      id: deliveryman_id,
    });*/
/*
    return res.json({
      user: newDeliveryman,
    });*/

    return res.json({ok:true});

/*
    return res.json({
      loading: false,
      profile: {
        id,
        person_id,
        person: { id: idPerson, name, status, privacy: newPrivacy },
      },
    });*/
  }
}

export default new AcceptRegulationController();
