import App from './App';
import React from 'react';
import axios from 'axios';
import {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {makeUseAxios} from 'axios-hooks';
import Toast from 'react-bootstrap/Toast';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.css';

const useAxios = makeUseAxios({
  axios: axios.create({baseURL: 'http://localhost:1337/v1'})
});

const Mocked = ({Component}) => {
  const [{data: warehouses, loading, error}, startGet] = useAxios('/warehouses');
  const [{loading: deleting, error: deleteError}, startDelete] = useAxios({
    method: 'DELETE'
  }, {manual: true});

  const deleteWarehouse = warehouseId => startDelete({
    url: `/warehouse/${warehouseId}`
  }).then(() => startGet());
  const toastMsg = deleteError && 'Warehouse deletion failed';

  return (
    <Fragment>
      <Component {...{warehouses, loading, failed: error, deleteWarehouse, deleting}}/>
      <Toast style={{position: 'fixed', top: '10px', right: '10px'}} show={toastMsg}>
        <Toast.Body>{toastMsg}</Toast.Body>
      </Toast>
    </Fragment>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Mocked Component={App}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
