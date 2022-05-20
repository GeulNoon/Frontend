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
  /*useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `http://3.38.70.33:8000/api/getMoreHistory`,
        { params: { email: sessionStorage.getItem("user") } }
      );
      setTitle(response.data.title);
    }
    fetchData();
  }, []);*/

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://www.geulnoon.com/api/getMoreReview`,
        { params: { email: sessionStorage.getItem("user") } }
      );
      setTitle(response.data.title);
      //if(response.data)
        //console.log(title)
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

  const navigateToStudy = (a_id) => {
    setTimeout(() => {
      //console.log(a_id)
      axios({
        method: "put",
        url: "https://www.geulnoon.com/api/reviewStudy/",
        headers: { "Content-Type": "application/json" },
        data: { "email": sessionStorage.getItem('user'), "a_id": a_id},
      }).then(response => {
      //console.log(response.data['s_id'])
      sessionStorage.setItem('s_id', response.data['s_id'])
      sessionStorage.setItem('a_id', a_id)
      navigate("/Review/ReviewStep1")
      })
      .catch(error => {
        alert('문제 로드 실패')
      });
    }, 500);
  };

  return (
    <ThemeProvider theme={theme}>
      <TableContainer>
        <Table size="small" style={{ width: '100%' }}h>
          <TableHead>
            <TableRow>
              <TableCell align="left">지문</TableCell>
              <TableCell align="left">최근 학습날짜</TableCell>
              <TableCell align="left">총 학습 횟수</TableCell>
              <TableCell align="left">요약하기 최고 점수</TableCell>
              <TableCell align="left">어휘 문제 최고 점수</TableCell>
              <TableCell align="left">빈칸문제 최고 점수</TableCell>
              <TableCell align="left">문제 풀기 </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/*학습 이력 요소*/}
            {title
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((i, j) => (
                <TableRow key={j}>
                  <TableCell align="left"><h4>{i[0]}</h4></TableCell>
                    <TableCell align="left"><h5>{i[1]}</h5></TableCell>
                    <TableCell align="left"><h5>{i[2]}</h5></TableCell>
                    <TableCell align="left"><h5>{i[3]}</h5></TableCell>
                    <TableCell align="left"><h5>{i[4]}</h5></TableCell>
                    <TableCell align="left"><h5>{i[5]}</h5></TableCell>
                  <TableCell align="center">
                    <Button onClick={() => navigateToStudy(i[6])}>
                      문제풀기
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