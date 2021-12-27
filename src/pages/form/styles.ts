// import styled, { keyframes, css } from 'styled-components';

// export const UserForm = styled.div`
//   label {
//     margin-top: 15px;
//     padding: 5px;
//     display: flex;
//     align-items: center;

//     font-size: 16px;
//     font-weight: bold;
//   }

//   input {
//     flex: 1;
//     width: 100%;
//     border: 1px solid #666;
//     border-radius: 4px;
//     outline: none;
//     padding: 10px;
//   }

//   hr {
//     border: 1px solid #eee;
//     margin-top: 40px;
//     margin-bottom: 40px;
//   }
// `;

// export const HeaderUser = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;

//   div {
//     display: flex;
//     align-items: center;
//     justify-content: center;

//     > svg {
//       padding-right: 10px;
//     }
//   }
// `;

// export const FooterUser = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;

//   div {
//     display: flex;
//     align-items: center;
//     justify-content: center;

//     > svg {
//       padding-right: 10px;
//     }
//   }
// `;

// const rotate = keyframes`
//   from {
//     transform: rotate(0deg);
//   }

//   to {
//     transform: rotate(360deg);
//   }
// `;

// export const SubmitButton = styled.button.attrs((props) => ({
//   type: 'submit',
//   // disabled: props.loading,
// }))`
//   background: #0aa11d;
//   border: 0;
//   padding: 10px 15px;
//   margin-left: 10px;
//   border-radius: 5px;

//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-weight: bold;
//   font-size: 18px;
//   color: #fff;

//   > svg {
//     margin: 10px;
//   }

//   &[disabled] {
//     cursor: not-allowed;
//     opacity: 0.6;
//   }

//   ${(props) =>
//     props.loading &&
//     css`
//       svg {
//         animation: ${rotate} 1s linear infinite;
//       }
//     `}
// `;
