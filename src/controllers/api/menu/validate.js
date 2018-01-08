import { validate as validateMenu } from '../../../services/menu';
import Api from '../../../lib/api';

export default (request, response) => {
  const { menuId } = request.params;

  if (!menuId) {
    return response.status(400).send('You must provide id of the menu you want to validate');
  }

  const onSuccess = menu => {
    response.send(validateMenu(menu));
  };

  const onError = error => {
    if (error.response) {
      const { status, data } = error.response;
      return response.status(status).send(data);
    }

    return response.status(500).send(error);
  };

  return Api.getMenyById(menuId).then(onSuccess).catch(onError);
}