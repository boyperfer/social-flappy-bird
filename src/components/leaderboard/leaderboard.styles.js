import { styled, css } from "styled-components";

const getBackground = ({ num }) => {
    console.log(num);
    return num % 2
        ? css`
              background: #f5f5f5;
          `
        : css`
              background: white;
          `;
};

export const LeaderBoardContainer = styled.div`
    border-radius: 20px;
    display: block;
    overflow: visible;
    position: relative;
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(230, 230, 230);
    width: 30%;
    margin: 100px auto;
`;

export const UsersContainer = styled.div`
    display: flex;
    justify-content: space-between;
    ${getBackground}
`;

export const TextContainer = styled.div`
    font-size: 20px;
    width: 12.5vw;
    margin: 10px 0px;
    font-weight: bold;
    color: #53a5d2;
`;
