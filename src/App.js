import {Fragment} from 'react';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

function App({
  warehouses = [],
  loading = false,
  failed = false,
}) {
  const tbody = () => {
    if (failed) {
      return (
        <tr>
          <td colSpan="4"><Alert variant="danger">Error encountered while loading warehouses</Alert></td>
        </tr>
      );
    }
    if (warehouses.length === 0) {
      return (
        <tr>
          <td colSpan="4">No warehouses in system</td>
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
        </tr>
      ));
    }
  };

  return (
    <Fragment>
      {loading && (
        <div style={{height: '100vh'}} className="d-flex align-items-sm-center justify-content-sm-center">
          <Spinner animation="grow" size="lg" variant="info"/>
        </div>
      )}
      {!loading && (
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
            </tr>
          </thead>
          <tbody>{tbody()}</tbody>
        </Table>
      )}
    </Fragment>
  );
}

export default App;
