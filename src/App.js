import {Fragment} from 'react';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import './app.css';

function App({
  warehouses = [],
  loading = false,
  deleting = false,
  failed = false,
  deleteWarehouse = warehouseId => Promise.reject(),
}) {
  const tbody = () => {
    if (failed && !warehouses.length) {
      return (
        <tr>
          <td colSpan="5"><Alert variant="danger">Error encountered while loading warehouses</Alert></td>
        </tr>
      );
    }
    if (warehouses.length === 0 && !loading) {
      return (
        <tr>
          <td colSpan="5">No warehouses in system</td>
        </tr>
      );
    }
    if (warehouses.length > 0) {
      return warehouses.map(({
        warehouseId,
        warehouseName,
        warehouseDescription,
        warehouseAddress: {
          buildingName,
          city,
          country,
          stateProvince,
          streetLine1,
          streetLine2,
          zipPostalCode
        }
      }, index) => (
        <tr key={`warehouse-${warehouseId}`}>
          <td>{warehouseId}</td>
          <td>{warehouseName}</td>
          <td>{warehouseDescription}</td>
          <td>
            <address style={{whiteSpace: 'pre-line'}}>
              {`${streetLine1}
                ${buildingName}, ${streetLine2}
                ${city}, ${stateProvince} ${zipPostalCode}
                ${country}`}
            </address>
          </td>
          <td>
            <Button size="sm" variant="danger" onClick={e => deleteWarehouse(warehouseId)}>delete</Button>
          </td>
        </tr>
      ));
    }
  };

  return (
    <Fragment>
      {((deleting || loading) && (warehouses.length > 0)) && (
        <div style={{height: '100vh'}} className="backdrop d-flex align-items-sm-center justify-content-sm-center">
          <Spinner animation="grow" size="lg" variant="info"/>
        </div>
      )}
      {(loading && (warehouses.length === 0)) && (
        <div style={{height: '100vh'}} className="d-flex align-items-sm-center justify-content-sm-center">
          <Spinner animation="grow" size="lg" variant="info"/>
        </div>
      )}
      {(!loading || (warehouses.length > 0)) && (
        <Table bordered>
          <thead>
            <tr>
              <th>
                #
              </th>
              <th>
                Name
              </th>
              <th style={{width: '50%'}}>
                Description
              </th>
              <th>
                Address
              </th>
              <th>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>{tbody()}</tbody>
        </Table>
      )}
    </Fragment>
  );
}

export default App;
