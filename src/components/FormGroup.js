import styled from "@emotion/styled";

const FormGroup = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
    gap: 20px;
    font-size: 20px;
    font-family: "Roboto", sans-serif;

    input {
        width: 400px;
        height: 22px;
        border-radius: 3px;
        border: none;
    }

    input:focus {
        outline-color: #112240;
    }
`;

export default FormGroup;
