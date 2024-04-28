import styled from 'styled-components';

export const SignUpContainer = styled.div`
  width: 300px; /* Adjust width as needed */
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
  padding: 10px; /* Adjusted padding */
  margin: 50px auto; /* Adjusted margin for centering */
  border-radius: 20px; /* Larger rounded corners */
  height: auto; /* Set height to auto to adjust based on content */

  /* Cool and attractive gradient background */
  background-image: linear-gradient(
      to right,
      #e0eefa 0%,
      #c4ced8 50%,
      #98aab7 100%
  );

  /* Create a border with a subtle glow effect */
  box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.8),
              0 0 10px 10px rgba(0, 0, 0, 0.1);

  /* Adjust text styles for better contrast */
  color: #333; /* Dark text color */
  h2 {
    margin: 5px 0; /* Adjusted margin between titles */
    font-size: 24px; /* Adjusted font size */
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2); /* Subtle text shadow */
  }
`;

export const TitleContainer = styled.h2`
    margin: 5px 0; /* Adjusted margin between titles */
    font-size: 24px; /* Adjusted font size */
    color: #333;
    text-align: center;
`;

export const FormContainer = styled.form`
    width: 100%;
`;

export const FormInput = styled.input`
    width: 100%;
    margin-bottom: 15px;
    padding: 0px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    outline: none;

    &:focus {
        border-color: #007bff;
    }
`;

export const CustomButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;

export const ErrorMessage = styled.span`
    color: red;
    font-size: 14px;
    margin-top: 5px;
`;
