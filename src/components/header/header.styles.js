import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const HeaderContainer = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 25px;
	color: black;
	position: fixed;
	top: 0;
	right: 0;
`

export const LinkContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 25px;
	color: black;
`

export const OptionsContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
	color: black;
`

export const OptionLink = styled(Link)`
    padding: 10px 15px;
	color: black;
`
