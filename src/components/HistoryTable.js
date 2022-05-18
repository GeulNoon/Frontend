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

const Button = styled.div`
  display: inline-flex;
  font-weight: normal;
  font-size: 14px;
  color: black;
  background-color: white;
  border-bottom: 1px solid grey;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  padding: 5px;
  background-color: #5b6d5b;
  :hover{
    background-color: #5b6d5b;
    opacity: 0.7;
  }
  color: white;
  border: none;
  cursor: pointer;
`;

const theme = unstable_createMuiStrictModeTheme();
//npm install @material-ui/core recharts

function HistoryTable() {
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

  const StudyDelete = (s_id) => {
    if(window.confirm("정말 삭제합니까?")) {
      axios.delete(`http://127.0.0.1:8000/api/getMoreHistory/`, 
      {data: {"s_id": s_id}})
      .catch(error => {
        alert('삭제 실패')
      })
      .then(response => {
      window.location.reload();
      });
    } else {
      alert("취소합니다.")
    }
  };

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
              <TableCell>번호</TableCell>
              <TableCell align="left">지문</TableCell>
              <TableCell align="center">학습 날짜</TableCell>
              <TableCell align="center">요약하기 지문 이해도</TableCell>
              <TableCell align="center">어휘풀기 점수</TableCell>
              <TableCell align="center">빈칸풀기 점수</TableCell>
              <TableCell align="center">삭제</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/*학습 이력 요소*/}
            {title
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((i, j) => (
                <TableRow key={j}>
                  <TableCell component="th" scope="row">
                    {page * rowsPerPage + j + 1}
                  </TableCell>
                  <TableCell align="left">
                    <Button onClick={() => navigateToStudy(i[6], i[5])}>
                      {i[7] ? "(재)" : null}
                      {i[0]}
                    </Button>
                  </TableCell>
                  <TableCell align="center">{i[1]}</TableCell>
                  <TableCell align="center">{i[2]}</TableCell>
                  <TableCell align="center">{i[3]}</TableCell>
                  <TableCell align="center">{i[4]}</TableCell>
                  <TableCell align="center">
                    <DeleteButton onClick={() => StudyDelete(i[6])}>삭제</DeleteButton>
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

export default HistoryTable;