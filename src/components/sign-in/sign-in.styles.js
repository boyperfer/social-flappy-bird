import styled from 'styled-components';

export const SignInContainer = styled.div`
  width: 300px; /* Adjust width as needed */
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
  padding: 20px; /* Adjusted padding */
  margin: 50px auto; /* Adjusted margin for centering */
  border-radius: 20px; /* Larger rounded corners */

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
    margin: 15px 0;
    font-size: 25px; /* Slightly smaller font size */
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2); /* Subtle text shadow */
  }
`;

export const TitleContainer = styled.h2`
    margin: 5px 0; /* Adjusted margin between titles */
    font-size: 24px; /* Adjusted font size */
    color: #333;
    text-align: center;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
