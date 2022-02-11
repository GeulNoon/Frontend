//학습하기의 더보기 학습이력 테이블
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
const theme = unstable_createMuiStrictModeTheme();
//npm install @material-ui/core recharts

//임시 데이터
const users = [
  {
    'id': 1,
    'title': "2015년도 고3 9월 모의고사 31번-34번 지문",
    'date': "2021/11/28",
    'step2': "85%",
    'step3': "3/4"
  },
  {
    'id': 2,
    'title': "2009년도 수능 24번-26번 지문",
    'date': "2021/11/28",
    'step2': "85%",
    'step3': "3/4"
  }
]

function HistoryTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <ThemeProvider theme = {theme}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell align="left">지문</TableCell>
              <TableCell align="center">학습 날짜</TableCell>
              <TableCell align="center">지문 이해도</TableCell>
              <TableCell align="center">어휘퀴즈 정답</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/*학습 이력 요소*/}
            {users
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map(({ id, title, date, step2, step3 }, i) => (
                <TableRow key={id}>
                  <TableCell component="th" scope="row">
                    {page * rowsPerPage + i + 1}
                  </TableCell>
                  <TableCell align="left">
                    <NavLink style={{ color: 'black'}} to={{pathname: `/Study/Step4`}}>
                      {title}
                    </NavLink> {/*제목 클릭시 학습결과 화면으로 이동*/}
                </TableCell>
                  <TableCell align="center">{date}</TableCell>
                  <TableCell align="center">{step2}</TableCell>
                  <TableCell align="center">{step3}</TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={users.length}
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