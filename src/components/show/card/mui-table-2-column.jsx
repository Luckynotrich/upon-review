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
const HeadCell = ({name})=> {return <TableCell align="center" sx={{border: "1px solid black",color: "inherit"}}>{name}</TableCell>}
const Cell = ({name})=> {return <TableCell scope="row" align="left" sx={{border:"1px solid black",color: "inherit"}}>{name}</TableCell>}

export default function MuiTable2Column({ rows, name1, name2 }) {

  return (
    <div>
    <TableContainer /* component={Paper} */>
      <Table sx={{ minWidth: 300, background:"transparent", border:"1px solid back"}}>
        <TableHead>
          <TableRow>
            <HeadCell name={name1} />
            <HeadCell name={name2} />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(
            (
              row,i //forEach didn't work here
            ) => (
              <TableRow
                key={`row.${i}`}
                sx={{
                  wordWrap: "break-word",
                }}
              >
                <Cell name={row.col1} />
                <Cell name={row.col2} />
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
    &nbsp;</div>
  );
}
MuiTable2Column.propTypes = {
  name1: PropTypes.string.isRequired,
  name2: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
};
