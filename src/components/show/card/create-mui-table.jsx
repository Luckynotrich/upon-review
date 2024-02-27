import React from 'react'
import PropTypes from "prop-types"
import MuiTable from "./mui-table";

function createData(name,id){
    return {name,id}
  }

  export default function CreateMuiTable({values,name}){
    const rows = values.map((row)=> createData(row.value,row.id))
    return <MuiTable rows={rows} name={name} /> 
  }
  CreateMuiTable.propTypes = {
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired
}