// components/FooterStyles.js




import styled from "styled-components";


export const Box = styled.div`
	// padding: 3% 13%;
	background: #E9F1FF;
	// position: absolute;
	bottom: 0;
	// width: 100%;
	// border:2px solid red;

	// @media (max-width: 768px) {
	// 	padding: 70px 30px;
	// 	padding: 3% 0%;
	// }
`;

export const FooterContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   max-width:80%;
//   margin: 0 auto;
  &:hover {
    background-color: transparent !important;
  }
`;

export const Column = styled.div`
	display: flex;
	flex-direction: column;
	text-align: left;
	// margin-left: 11px;
	// margin-bottom: 20px;
`;

export const Row = styled.div`
	// display: grid;
	// grid-template-columns: repeat(
	// 	auto-fill,
	// 	minmax(200px, 1fr)
	// );
	// // grid-gap: 100px;

	// @media (max-width: 1000px) {
	// 	grid-template-columns: repeat(
	// 		auto-fill,
	// 		minmax(200px, 1fr)
	// 	);
	// }
`;

export const FooterLink = styled.a`
	color: #434343;
	// margin-bottom: 15px;
	font-size: 16px;
	text-decoration: none;
	

	&:hover {
		color: #286cac;
		transition: 200ms ease-in;
	}
`;

export const Heading = styled.p`
	font-style: normal;
    font-weight: bold;
    font-size: 19px;
    color: #434343;
    margin-bottom: 15px;
`;



