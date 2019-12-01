import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  height: 4.6rem;
  border-radius: 5px;
  transition: box-shadow 0.4s, transform 0.4s ease-in-out;
  margin-bottom: 2rem;

  &:hover {
    transform: scale(1.005);
    box-shadow: 0rem 0.1rem 1rem rgba(17, 238, 246, 30%);
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0.6rem;
    background: #11eef6;
    border-radius: 5px 0 0 5px;
  }

  a {
    text-decoration: none;
  }

  h3 {
    font-family: "Blinker", sans-serif;
    font-weight: 400;
    font-size: 1.8rem;
    color: #11eef6;
    text-shadow: 0.13rem 0.13rem #1b7171;
    padding-left: 1.8rem;
  }
`

const ResourceListing = ({ title, link }) => (
  <Container>
    <Link to={`/app/${link}`}>
      <h3>{title}</h3>
    </Link>
  </Container>
)

export default ResourceListing
