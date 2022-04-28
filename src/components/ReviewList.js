//학습하기의 더보기 학습이력 테이블
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme } from "@material-ui/core/styles";
import axios from "axios";
import styled from "styled-components";

//문제풀기, 해설보기 버튼 디자인
const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 25px;
  font-size: 11px;
  color: white;
  background-color: #5b6d5b;
  :hover {
    background-color: #5b6d5b;
    opacity: 0.7;
  }
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const theme = unstable_createMuiStrictModeTheme();
//npm install @material-ui/core recharts

function ReviewList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [title, setTitle] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/getMoreHistory`,
        { params: { email: sessionStorage.getItem("user") } }
      );
      setTitle(response.data.title);
    }
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const navigateToStudy = (s_id, a_id) => {
    sessionStorage.setItem("s_id", s_id);
    sessionStorage.setItem("a_id", a_id);
    navigate("/Study/Step4");
  };

  return (
    <ThemeProvider theme={theme}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">지문</TableCell>
              <TableCell align="left">문제 풀기</TableCell>
              <TableCell align="left">해설 보기</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/*학습 이력 요소*/}
            {title
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((i, j) => (
                <TableRow key={i[4]}>
                  <TableCell align="left">
                    <h4>{i[0]}</h4>
                  </TableCell>
                  <TableCell align="center">
                    <Button onClick={() => navigateToStudy(i[5], i[4])}>
                      문제풀기
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button onClick={() => navigateToStudy(i[5], i[4])}>
                      해설보기
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={title.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}

export default ReviewList;