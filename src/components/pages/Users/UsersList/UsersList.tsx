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
import { useSelector } from "react-redux";
import {
  HeadCell,
  EnhancedTableProps,
  IEnhancedTable,
} from "../interfaces/users-list.interfaces";
import { selectCurrentUser } from "../../../../redux/userSlice";

const headCells: readonly HeadCell[] = [
  {
    id: "email",
    label: "Email",
  },
  {
    id: "firstName",
    label: "First name",
  },
  {
    id: "lastName",
    label: "Last name",
  },
  {
    id: "nickName",
    label: "Nick name",
  },
  {
    id: "position",
    label: "Position",
  },
  {
    id: "description",
    label: "Description",
  },
  {
    id: "phoneNumber",
    label: "Phone number",
  },
];

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

export function UsersList({
  users,
  order,
  setOrder,
  orderBy,
  setOrderBy,
}: IEnhancedTable) {
  const user = useSelector(selectCurrentUser);
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
    if (user!.id === id) {
      navigate("/profile");
    }
    navigate({
      pathname: `/user/${id}`,
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
              rowCount={users.length}
            />
            <TableBody>
              {users.map((user) => (
                <TableRow
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    goToCompany(user.id);
                  }}
                  key={user.email}
                >
                  <TableCell component="th" id={user.email} scope="row">
                    {user.email}
                  </TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.nickName}</TableCell>
                  <TableCell>{user.position}</TableCell>
                  <TableCell>{user.description}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
