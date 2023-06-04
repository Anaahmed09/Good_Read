import React from "react"; //, { useEffect }
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./table.css";

export default function userTable({ DData, rows, filter, onDataReceived, statusData }) {
  const Read = DData.filter((item) => item.status == "Read");
  const Want_to_read = DData.filter((item) => item.status == "Want to read");
  const Reading = DData.filter((item) => item.status == "Reading");
  const value = filter || "All";
  // const [value, setValue] = React.useState("");
  // const [age, setAge] = React.useState("");

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };
  //   const sendDataToParent = (data) => {
  //     console.log(data);
  //     onDataReceived(data);
  //   };

  // const changeRate = (event, newValue) => {
  //   setValue(newValue);
  // };
  // useEffect(() => {
  //   console.log(filter);
  //   if (filter == null) {
  //     setValue("All");
  //   } else {
  //     setValue(filter);
  //   }
  // }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          <TableRow>
            {rows.map((head, index) => {
              return (
                <TableCell align="center" className="bold" key={index}>
                  {head}
                </TableCell>
              );
            })}
          </TableRow>
          {value == "All" ? (
            DData.map((row) => (
              <TableRow key={row?._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                {console.log(row)}
                <TableCell align="center">{row?.book.name}</TableCell>
                <TableCell align="center">{row?.book.authorId.firstName}</TableCell>
                <TableCell align="center">
                  <Rating
                    name="simple-controlled"
                    value={row?.rate}
                    onChange={(event, newValue) => {
                      onDataReceived({
                        id: row._id,
                        rate: newValue,
                        user: row.user._id,
                        book: row.book._id,
                        status: row.status,
                      });
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Rating name="read-only" value={row.rate} readOnly />
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">{row.status}</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={row.status}
                        label={row.status}
                        onChange={(event) => {
                          statusData({
                            id: row._id,
                            rate: row.rate,
                            user: row.user._id,
                            book: row.book._id,
                            status: event.target.value,
                          });
                        }}
                      >
                        <MenuItem value={"Want to read"}>Want To Read</MenuItem>
                        <MenuItem value={"Reading"}>Reading</MenuItem>
                        <MenuItem value={"Read"}>Read</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          ) : value == "Read" ? (
            Read.map((row) => (
              <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="center">{row.book.name}</TableCell>
                <TableCell align="center">{row.book.authorId.firstName}</TableCell>
                <TableCell align="center">
                  <Rating
                    name="simple-controlled"
                    value={row.rate}
                    onChange={(event, newValue) => {
                      onDataReceived({
                        id: row._id,
                        rate: newValue,
                        user: row.user._id,
                        book: row.book._id,
                        status: row.status,
                      });
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Rating name="read-only" value={row.rate} readOnly />
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">{row.status}</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={row.status}
                        label={row.status}
                        onChange={(event) => {
                          statusData({
                            id: row._id,
                            rate: row.rate,
                            user: row.user._id,
                            book: row.book._id,
                            status: event.target.value,
                          });
                        }}
                      >
                        <MenuItem value={"Want to read"}>Want To Read</MenuItem>
                        <MenuItem value={"Reading"}>Reading</MenuItem>
                        <MenuItem value={"Read"}>Read</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          ) : value == "Reading" ? (
            Reading.map((row) => (
              <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="center">{row.book.name}</TableCell>
                <TableCell align="center">{row.book.authorId.firstName}</TableCell>
                <TableCell align="center">
                  <Rating
                    name="simple-controlled"
                    value={row.rate}
                    onChange={(event, newValue) => {
                      onDataReceived({
                        id: row._id,
                        rate: newValue,
                        user: row.user._id,
                        book: row.book._id,
                        status: row.status,
                      });
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Rating name="read-only" value={row.rate} readOnly />
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">{row.status}</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={row.status}
                        label={row.status}
                        onChange={(event) => {
                          statusData({
                            id: row._id,
                            rate: row.rate,
                            user: row.user._id,
                            book: row.book._id,
                            status: event.target.value,
                          });
                        }}
                      >
                        <MenuItem value={"Want to read"}>Want To Read</MenuItem>
                        <MenuItem value={"Reading"}>Reading</MenuItem>
                        <MenuItem value={"Read"}>Read</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          ) : value == "Want to read" ? (
            Want_to_read.map((row) => (
              <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="center">{row.book.name}</TableCell>
                <TableCell align="center">{row.book.authorId.firstName}</TableCell>
                <TableCell align="center">
                  <Rating
                    name="simple-controlled"
                    value={row.rate}
                    onChange={(event, newValue) => {
                      onDataReceived({
                        id: row._id,
                        rate: newValue,
                        user: row.user._id,
                        book: row.book._id,
                        status: row.status,
                      });
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Rating name="read-only" value={row.rate} readOnly />
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">{row.status}</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={row.status}
                        label={row.status}
                        onChange={(event) => {
                          statusData({
                            id: row._id,
                            rate: row.rate,
                            user: row.user._id,
                            book: row.book._id,
                            status: event.target.value,
                          });
                        }}
                      >
                        <MenuItem value={"Want to read"}>Want To Read</MenuItem>
                        <MenuItem value={"Reading"}>Reading</MenuItem>
                        <MenuItem value={"Read"}>Read</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell align="center">No Data</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
