import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from './grid.jsx';


export const meld =(cats,revs)=>{
  let Array =[];
  
  if(revs.length === 0 || revs[0].value === null){
    Array.push({value:'none',id:0})
    return (Array)
  }
  Array = revs.map((rev)=>{         
       return (cats.find((cat)=>(cat.id === rev.id)))
    })
    Array = Array.filter(Boolean);
return Array;
}

function createGridData(pros, cons) {
  let phoRows = [pros.length];
  
  pros.forEach((pro, index) => {
    phoRows[index] = {
      id: index,
      col1: `${pro.value}`,
      wordWrap: 'break-word',
    };
  });
  if (cons.length > 0 && cons[0] != 0)
    phoRows.forEach((row, index) => {
      if (phoRows.length > index && cons.length > index){
        phoRows[index] = { ...phoRows[index], col2: `${cons[index].value}` };}
    });
  if (cons.length > pros.length) {
    for (let i = pros.length; i < cons.length; i++) {
      phoRows[i] = { id: i, col1: '', col2: `${cons[i].value}` };
    }
  }
  return phoRows;
}

export default function CreateGrid({ cats, revs }) {
 
  const [pros] = useState(revs?meld(cats.pros,revs.pros):cats.pros);
  const [cons] = useState(revs?meld(cats.cons,revs.cons):cats.cons);

  const [rows] = useState(createGridData(pros, cons));

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
  cats: PropTypes.object,
  revs: PropTypes.object,
};
