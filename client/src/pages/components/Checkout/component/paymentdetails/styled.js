import styled from "styled-components";

export const Card = styled.div``;

//export const Main = styled.div``;

export const Cart = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 120px;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 50%;
  padding-right: 114px;
`;

export const paymentDetails = styled.h3`
  color: #071d57;
  font-family: "Montserrat";
  text-align: start;
  margin-left: 64px;
`;

export const cardNumber = styled.h3`
  color: #071d57;
  font-family: "Montserrat";
  text-align: start;
`;

export const digit = styled.p`
  color: #21212180;
  align-self: flex-start;
`;

export const inputWrapper = styled.div`
  display: flex;
  background: #f7f7f7;
  border: 1px solid #3a3a3a;
  border-radius: 10px;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

export const inputImages = styled.div`
  display: flex;
  position: absolute;
  top: 7px;
  left: 17px;
  height: 13px;
`;

export const visaImages = styled.img`
  height: 100%;
`;

export const numberInput = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  height: 45px;
  background-color: #f7f7f7;
`;

export const nameInput = numberInput; 

export const inputh3 = styled.h3`
  align-self: flex-start;
  color: #071d57;
  font-family: "Montserrat";
`;

export const amountInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  height: 45px;
  background-color: #f7f7f7;
  border: 1px solid #3a3a3a;
`;

export const cvvContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Cvv = styled.h3`
  margin-top: 20px;
  color: #071d57;
  font-family: "Montserrat";
  text-align: start;
`;

export const threeDigit = styled.p`
  color: #21212180;
  align-self: flex-start;
  margin-bottom: 30px;
`;

export const cvvInput = styled.div`
  display: flex;
`;

export const inputDigit = styled.input`
  border-radius: 10px;
  height: 45px;
  background-color: #f7f7f7;
  border: 1px solid #3a3a3a;
  width: 280px;
`;

export const expireContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const expiryDate = styled.h3`
  text-align: start;
  color: #071d57;
  font-family: "Montserrat";
`;

export const expiration = styled.p`
  align-self: flex-start;
  color: #21212180;
`;

export const Calendar = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const month = styled.input`
  height: 52px;
  border-radius: 10px;
  width: 116px;
  background-color: #f7f7f7;
  border: 0.2px solid #3a3a3a;
  margin-right: 15px;
  text-align: center;
`;
export const year = styled.input`
  height: 52px;
  border-radius: 10px;
  width: 116px;
  background-color: #f7f7f7;
  border: 0.2px solid #3a3a3a;
  margin-left: 15px;
  text-align: center;
`;

export const donate = styled.button`
  background-color: #071d57;
  color: #ffffff;
  font-family: "Montserrat";
  margin-top: 50px;
  margin-bottom: 50px;
  font-size: 15x;
  height: 50px;
  border-radius: 10px;
`;

export const untitledContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 50%;
`;

export const Untitled = styled.div`
  background-color: #d9d2e9;
  height: 30%;
  width: 60%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const header = styled.h6`
  align-self: flex-start;
  font-family: "Montserrat";
  color: #8e8e8e;
  font-size: 15px;
  margin-left: 15px;
`;

export const circleLogo = styled.div`
  align-self: flex-end;
  margin-right: 40px;
  background-color: #ffffff;
  bottom: 10px;
  position: absolute;
`;

export const untitledVat = styled.div`
  background-color: #d6d6d6;
  height: 35%;
  width: 60%;
  display: flex;
  flex-direction: column;
`;
export const institution = styled.p`
  align-self: start;
  margin-left: 30px;
`;
export const uniqueId = styled.p`
  align-self: start;
  margin-left: 30px;
`;
export const Vat = styled.p`
  align-self: start;
  margin-left: 30px;
`;
export const amountToPay = styled.p`
  align-self: start;
  margin-left: 30px;
`;
