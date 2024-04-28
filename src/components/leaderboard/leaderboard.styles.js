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
    width: 40vw;
    margin-left: 0;
    border-collapse: collapse;
    border-spacing: 0px;
`;
export const RankContainer = styled.div`
    border-radius: 4px 0px 0px;
    position: relative;
    height: 32px;
    user-select: none;
    background: #282831;
    color: #adb5bd;
    font-size: 14px;
    line-height: 16px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    white-space: nowrap;
    border-color: var(--gray200);
    box-sizing: border-box;
    font-weight: bold;
    vertical-align: middle;
    padding: 4px;
    padding-left: 10px;
    width: 5%;
`;
export const TierContainer = styled.div`
	position: relative;
	height: 32px;
	user-select: none;
	background: #282831; 
	color: #adb5bd; 
	font-size: 14px;
	line-height: 16px;
	border-bottom-width: 1px;
	border-bottom-style: solid;
	white-space: nowrap;
	border-color: var(--gray200);
	box-sizing: border-box;
	font-weight: bold;
	vertical-align: middle;
	padding: 4px;
	width: 15%;
`;
export const ScoreContainer = styled.div`
	position: relative;
	height: 32px;
	user-select: none;
	background: #282831; 
	color: #adb5bd;
	font-size: 14px;
	line-height: 16px;
	border-bottom-width: 1px;
	border-bottom-style: solid;
	white-space: nowrap;
	font-weight: bold;
	border-color: var(--gray200);
	box-sizing: border-box;
	vertical-align: middle;
	padding: 4px;
	padding-left: 10px;
	width: 10%;
`;
export const DisplayNameContainer = styled.div`
	position: relative;
	height: 32px;
	user-select: none;
	background: #282831; 
	color: #adb5bd; 
	font-size: 14px;
	line-height: 16px;
	border-bottom-width: 1px;
	border-bottom-style: solid;
	white-space: nowrap;
	border-color: var(--gray200);
	box-sizing: border-box;
	font-weight: bold;
	vertical-align: middle;
	padding: 4px;
	padding-left: 20px;
	width: 70%;
`;
export const UsersContainer = styled.div`
    display: flex;
    ${getBackground}
`;
export const NumberContainer = styled.div`
	text-align: center;
	border-bottom-width: 1px;
	border-bottom-style: solid;
	border-color: var(--gray200);
    font-size: 20px;
    width: 5%;
    font-weight: bold;
    color: #adb5bd;
	font-size: 16px;
	line-height: 16px;
	text-align: left !important;
	font-weight: normal;
	white-space: nowrap;
	background: #31313c; 
	font-family: "Roboto", sans-serif;
	box-sizing: border-box;
	padding: 4px;
	padding-left: 10px;
	height: 40px;
	border-color: black;
`;
export const NameContainer = styled.div`
	border-bottom-width: 1px;
	border-bottom-style: solid;
	border-color: var(--gray200);
    font-size: 20px;
    width: 70%;
    font-weight: bold;
    color: #adb5bd;
	font-size: 12px;
	line-height: 16px;
	text-align: left !important;
	font-weight: normal;
	white-space: nowrap;
	background: #31313c; 
	font-family: "Roboto", sans-serif;
	box-sizing: border-box;
	padding: 4px;
	padding-left: 30px;
	height: 40px;
	border-color: black;
`;
export const TitleContainer = styled.div`
	border-bottom-width: 1px;
	border-bottom-style: solid;
	border-color: var(--gray200);
    font-size: 20px;
    width: 15%;
    font-weight: bold;
    color: #adb5bd;
	font-size: 12px;
	line-height: 16px;
	text-align: left !important;
	font-weight: normal;
	white-space: nowrap;
	background: #31313c; 
	font-family: "Roboto", sans-serif;
	box-sizing: border-box;
	padding: 4px;
	height: 40px;
	border-color: black;
`;
export const ScoreNumberContainer = styled.div`
	border-bottom-width: 1px;
	border-bottom-style: solid;
	border-color: var(--gray200);
    font-size: 20px;
    width: 10%;
    font-weight: bold;
    color: #adb5bd;
	font-size: 14px;
	line-height: 16px;
	text-align: left !important;
	font-weight: bold;
	white-space: nowrap;
	background: #31313c; 
	font-family: "Roboto", sans-serif;
	box-sizing: border-box;
	padding: 4px;
	padding-left: 30px;
	height: 40px;
	border-color: black;
`;
