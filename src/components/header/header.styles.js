import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
  border-radius: 10px; /* Add rounded corners */
`;

export const OptionsContainer = styled.div`
  display: flex; /* Inline elements */
  align-items: center;
`;

export const OptionLink = styled(Link)`
  padding: 10px 15px;
  color: black;
  text-decoration: none; /* Remove default link underline */
  font-weight: bold; /* Bold font for emphasis */
  margin-right: 20px; /* Spacing between links */
  background-color: #f5f5f5; /* Light background color for options */
  border-radius: 5px; /* Add rounded corners to options */

  &:hover {
    color: #333; /* Change color on hover */
  }
`;

