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

interface Data {
  name: string;
  address: string;
  serviceOfActivity: string;
  numberOfEmployees: number;
  type: string;
  description: string;
}

type Order = "asc" | "desc";
interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

export interface CompanyRes extends Data {
  id: number;
  userId: number;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "address",
    numeric: true,
    disablePadding: false,
    label: "Address",
  },
  {
    id: "serviceOfActivity",
    numeric: true,
    disablePadding: false,
    label: "Service Of Acivity",
  },
  {
    id: "numberOfEmployees",
    numeric: true,
    disablePadding: false,
    label: "Number Of Employees",
  },
  {
    id: "type",
    numeric: true,
    disablePadding: false,
    label: "Type",
  },
  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "Description",
  },
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
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
      </TableRow>
    </TableHead>
  );
}

interface IEnhancedTable {
  companies: CompanyRes[];
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  order: Order;
  orderBy: string;
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
                  <TableCell align="right">{company.address}</TableCell>
                  <TableCell align="right">
                    {company.serviceOfActivity}
                  </TableCell>
                  <TableCell align="right">
                    {company.numberOfEmployees}
                  </TableCell>
                  <TableCell align="right">{company.type}</TableCell>
                  <TableCell align="right">{company.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
