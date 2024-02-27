import React from 'react'
import PropTypes from "prop-types";
import { DataGrid /* , GridRowsProp, GridColDef  */ } from "@mui/x-data-grid";
import  Box  from "@mui/material/Box";
// import React from 'react'
export default function Grid({ rows, columns }) {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid sx={{height:400, color: "inherit"}} rows={rows} columns={columns} />
    </Box>
  );
}
Grid.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};
