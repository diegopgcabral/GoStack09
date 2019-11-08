import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 1200px;
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

    aside {
      display: flex;

      a {
        width: 142px;
        padding: 5px;
        border-radius: 4px;
        background-color: #ee4d64;
        color: #fff;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s;

        &:hover {
          background: ${darken(0.05, '#ee4d64')};
        }

        svg {
          margin-right: 3px;
        }
      }

      div {
        margin-left: 15px;
        border-radius: 4px;
        border: solid 1px #dddddd;
        background-color: #ffffff;
        width: 237px;
        height: 36px;
        display: flex;
        align-items: center;
        padding-left: 10px;

        input {
          padding: 8px 10px;
          background-color: #ffffff;
          color: #999999;
          border: none;
        }
      }
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
          }

          > .btnEdit {
            font-size: 15px;
            color: #4d85ee;
          }

          > .btnDelete {
            font-size: 15px;
            color: #de3b3b;
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
