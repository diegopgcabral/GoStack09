import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  border: 1px solid #dddddd;
  box-sizing: border-box;
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #dddddd;
    }

    ul {
      display: flex;
      justify-content: center;
      align-items: center;

      li {
        &:nth-child(1) {
          margin-left: 30px;
        }
        margin-left: 20px;
      }
    }

    a {
      font-weight: bold;
      color: #999999;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333333;
    }

    button {
      margin-top: 2px;
      font-size: 12px;
      color: #de3b3b;
      border: none;
      background: none;
    }
  }
`;
