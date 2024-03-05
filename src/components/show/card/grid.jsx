import React from 'react'
import PropTypes from "prop-types";
import { DataGrid /* , GridRowsProp, GridColDef  */ } from "@mui/x-data-grid";
import  Box  from "@mui/material/Box";
// import React from 'react'
export default function Grid({ rows, columns, gridHeight }) {
  return (
    <Box sx={{ height: `${gridHeight}`, width: "100%" }}>
      <DataGrid sx={{height:`${gridHeight}`, color: "inherit",borderColor:"black",paddingBottom: '1rem'}} rows={rows} columns={columns} disableColumnMenu={true}/>
    </Box>
  );
}
Grid.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};
