import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

export const TableCustom = () => {
  const columns = [
    { id: "number", label: "№", maxWidth: 25 },
    { id: "doctor", label: "ФИО врача", minWidth: 150 },
    {
      id: "patient",
      label: "ФИО пациента",
      minWidth: 150,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "date",
      label: "Дата",
      minWidth: 100,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "time",
      label: "Время",
      minWidth: 100,
      format: (value) => value.toFixed(2),
    },
  ];
  function createData(number, doctor, patient, date, time) {
    return { number, doctor, patient, date, time };
  }
  const rows = [
    createData("001", "Сабиров Ш.И", "Мансурова А.П", "13.05.2022", "09:50"),
    createData(
      "002",
      "Махмудходжаева. Д",
      "Мансурова А.П",
      "13.05.2022",
      "09:50"
    ),
    createData("003", "Паненко. Н", "Мансурова А.П", "13.05.2022", "09:50"),
    createData("004", "Сабиров Ш.И", "Мансурова А.П", "13.05.2022", "09:50"),
    createData(
      "005",
      "Махмудходжаева. Д",
      "Мансурова А.П",
      "13.05.2022",
      "09:50"
    ),
    createData("006", "Сабиров Ш.И", "Мансурова А.П", "13.05.2022", "09:50"),
  ];
  return (
    <TableContainer>
      <Table>
        <TableHead width={"100%"}>
          {/* <TableRow>
            <TableCell>№</TableCell>
            <TableCell>ФИО врача</TableCell>
            <TableCell>ФИО пациента</TableCell>
            <TableCell>Дата</TableCell>
            <TableCell>Время</TableCell>
					</TableRow> */}
          <TableRow width={"100%"}>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                // align={column.align}
                style={{
                  // top: 57,
                  padding: "15px 10px",
                  width: column.width,
                  minWidth: column.minWidth,
                  maxWidth: column.maxWidth,
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow key={row.number}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell
                      key={column.id}
                      style={{
                        // top: 57,
                        padding: "15px 10px",
                        width: column.width,
                        minWidth: column.minWidth,
                        maxWidth: column.maxWidth,
                      }}
                    >
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
