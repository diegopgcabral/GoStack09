import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 600px;
  margin: 0 auto;
  margin-top: 30px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    h1 {
      font-size: 24px;
      font-weight: bold;
      color: #444444;
      display: flex;
      align-items: center;
    }
  }
`;

export const Content = styled.div`
  margin-top: 24px;
  border-radius: 4px;
  background-color: #ffffff;

  table {
    width: 100%;
    text-align: left;
    padding: 30px;
    border: solid 1px #dddddd;

    thead {
      font-size: 16px;
      font-weight: bold;
      color: #444444;
    }

    tbody {
      font-size: 16px;
      color: #666666;

      tr {
        td {
          padding: 15px 0;
          border-bottom: 1px solid #eee;

          button {
            background: none;
            border: none;
            margin: 0 10px;
            font-size: 15px;
            color: #4d85ee;
          }

          &:last-child {
            text-align: right;
          }
        }
        &:last-child {
          td {
            border-bottom: 0;
          }
        }
      }
    }
  }
`;

export const Pagination = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    border: none;
    padding: 10px;
    border-radius: 4px;
    background-color: #cccccc;
    color: #fff;
    font-weight: bold;

    &:hover {
      background: ${darken(0.06, '#cccccc')};
    }
  }
  strong {
    margin: 0 10px;
    color: #444444;
  }
`;
