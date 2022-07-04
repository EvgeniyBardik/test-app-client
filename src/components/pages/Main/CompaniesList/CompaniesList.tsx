import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { useNavigate } from "react-router-dom";
import {
  HeadCell,
  EnhancedTableProps,
  IEnhancedTable,
} from "./interfaces/company-list.interfaces";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../redux/userSlice";

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    label: "Name",
  },
  {
    id: "address",
    label: "Address",
  },
  {
    id: "serviceOfActivity",
    label: "Service Of Acivity",
  },
  {
    id: "type",
    label: "Type",
  },
  {
    id: "description",
    label: "Description",
  },
  {
    id: "numberOfEmployees",
    label: "Number Of Employees",
  },
];

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
  const user = useSelector(selectCurrentUser);
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {user?.role === "ADMIN" && <TableCell>Owner email</TableCell>}
      </TableRow>
    </TableHead>
  );
}

export function CompaniesList({
  companies,
  order,
  setOrder,
  orderBy,
  setOrderBy,
}: IEnhancedTable) {
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const navigate = useNavigate();
  const goToCompany = (id: number) => {
    navigate({
      pathname: `/company/${id}`,
    });
  };

  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      <Paper sx={{ width: "100%" }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"small"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={companies.length}
            />
            <TableBody>
              {companies.map((company) => (
                <TableRow
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    goToCompany(company.id);
                  }}
                  key={company.name}
                >
                  <TableCell component="th" id={company.name} scope="row">
                    {company.name}
                  </TableCell>
                  <TableCell>{company.address}</TableCell>
                  <TableCell>{company.serviceOfActivity}</TableCell>
                  <TableCell>{company.type}</TableCell>
                  <TableCell>{company.description}</TableCell>
                  <TableCell>{company.numberOfEmployees}</TableCell>
                  {company.ownerEmail && (
                    <TableCell>{company.ownerEmail}</TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
