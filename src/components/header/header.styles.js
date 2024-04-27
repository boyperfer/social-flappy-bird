import styled from 'styled-components'
import { Link } from 'react-router-dom'


export const HeaderContainer = styled.div`
	background-color: #1c1c1f;
    width: 100%;
	height: 100px;
    display: flex;
    justify-content: flex-end;
	color: black;
	position: fixed;
	top: 0;
	right: 0;
`

export const LinkContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 25px;
	color: #adb5bd;
`

export const OptionsContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
	color: #adb5bd;
`

export const OptionLink = styled(Link)`
    padding: 10px 15px;
	color:  #adb5bd;
`
