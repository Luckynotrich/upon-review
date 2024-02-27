import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from './grid.jsx';

function createGridData(pros, cons) {
  let phoRows = [pros.length];
  pros.forEach((pro, index) => {
    phoRows[index] = {
      id: index,
      col1: `${pro.value}`,
      wordWrap: 'break-word',
    };
  });
  if (cons.length > 0)
    phoRows.forEach((row, index) => {
      if (phoRows.length > index && cons.length > index)
        phoRows[index] = { ...phoRows[index], col2: `${cons[index].value}` };
    });
  if (cons.length > pros.length) {
    for (let i = pros.length; i < cons.length; i++) {
      phoRows[i] = { id: i, col1: '', col2: `${cons[i].value}` };
    }
  }
  return phoRows;
}

export default function CreateGrid({ pros, cons }) {
  const [rows, setRows] = useState(createGridData(pros, cons));
  console.log('cons =', cons);

  const columns = [
    {
      field: 'col1',
      headerClassName: 'super-app-theme--header',
      headerName: 'Likes',
      width: 250,
      headerAlign: 'center',
    },
    {
      field: 'col2',
      headerClassName: 'super-app-theme--header',
      headerName: 'Dislikes',
      width: 250,
      headerAlign: 'center',
    },
  ];

  return <Grid rows={rows} columns={columns} />;
}
CreateGrid.propTypes = {
  pros: PropTypes.arrayOf(PropTypes.object),
  cons: PropTypes.arrayOf(PropTypes.object),
};
