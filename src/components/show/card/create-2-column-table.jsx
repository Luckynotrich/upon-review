import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import MuiTable2Column from './mui-table-2-column'


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

export default function Create2ColumnTable({ cats, revs }) {
 
  const [pros,setPros] = useState(revs?meld(cats.pros,revs.pros):cats.pros);
  const [cons,setCons] = useState(revs?meld(cats.cons,revs.cons):cats.cons);

  const [rows, setRows] = useState(createGridData(pros, cons));

  

  return <MuiTable2Column rows={rows} name1={'Likes'} name2={'Dislikes'} />;
}
Create2ColumnTable.propTypes = {
  cats: PropTypes.object,
  revs: PropTypes.object,
};