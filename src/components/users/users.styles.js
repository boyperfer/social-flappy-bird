import { styled } from "styled-components";

export const ProfileContainer = styled.div`
    max-width: 700px;
    margin: 20px auto;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
`;

export const ProfileHeader = styled.div`
    background-color: #f8f9fa;
    padding: 20px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

export const ProfileContent = styled.div`
    padding: 20px;
    display: flex;
    justify-content: flex-start;
`;

export const UserDetail = styled.div`
    max-width: 600px;
`;

export const TextContainer = styled.div`
    margin: 10px 0;
`;

export const ShareButtonContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
`;

export const ShareButtonLabel = styled.span`
    margin-right: 10px;
`;

export const ShareButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #3b5998;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #304e89;
    }
`;

export const FacebookIcon = styled.img`
    width: 24px;
    height: 24px;
    margin-right: 5px;
`;
