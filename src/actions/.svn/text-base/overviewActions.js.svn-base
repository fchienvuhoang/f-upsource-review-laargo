/**
 * Created by vuchien on 8/26/16.
 */
import * as types from '../constants/overviewTypes';
import {fetchGet, renderAPI} from '../components/api';

const PATH_CONTROLLER = 'stores/';

export function fetchStatistics() {
  return (dispatch) => {
    const pathAPI = PATH_CONTROLLER + 'statistics-overview?init=0'; // just is a temp param init = 0
    const url = renderAPI(pathAPI);
    return fetchGet(url, result => {
      dispatch({
        type: types.RECEIVED_STORE_STATISTICS,
        payload: {
          result,
        }
      })
    });
  }
}
