import React,{useState} from 'react'
import PropTypes from "prop-types"
import MuiTable from "./mui-table-1-column";
import {meld} from './create-grid'

function createData(name,id){
    return {name,id}
  }

  export default function CreateMuiTable({cats,revs,name}){
    const [values,setValues] = useState(meld(cats,revs)) 
    const rows = values.map((row)=> createData(row.value,row.id))
    return <MuiTable rows={rows} name={name} /> 
  }
  CreateMuiTable.propTypes = {
  revs: PropTypes.arrayOf(PropTypes.object).isRequired,
  cats: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired
}