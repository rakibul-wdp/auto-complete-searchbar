import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

const SearchBarContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 34em;
  height: 3.8em;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
`;

const SearchInputContainer = styled.div`
  width: 100%;
  min-height: 4em;
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px 15px;
`;

const SearchBar = () => {
  return (
    <SearchBarContainer>
      <SearchInputContainer></SearchInputContainer>
    </SearchBarContainer>
  );
};

export default SearchBar;
