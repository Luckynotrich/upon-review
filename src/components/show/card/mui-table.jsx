import React from 'react'
import PropTypes from "prop-types";
// import "./index.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";

export default function MuiTable({ rows, name }) {

  return (
    <div>
    <TableContainer /* component={Paper} */>
      <Table sx={{ minWidth: 320, background:"transparent" }}>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{border: "1px solid",color: "inherit"}}>{name}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(
            (
              row //forEach didn't work here
            ) => (
              <TableRow
                key={row.name}
                sx={{
                  border: "red",
                  wordWrap: "break-word",
                }}
              >
                <TableCell scope="row" align="left" sx={{border:"1px solid",color: "inherit"}}>
                  {row.name}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
    &nbsp;</div>
  );
}
MuiTable.propTypes = {
  name: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
};
