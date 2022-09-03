import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useClickOutside } from 'react-click-outside-hook';
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

const SearchIcon = styled.span`
  color: #bebebe;
  font-size: 27px;
  margin-right: 10px;
  margin-top: 6px;
  vertical-align: middle;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  font-size: 21px;
  color: #12112e;
  font-weight: 500;
  border-radius: 6px;
  background-color: transparent;

  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }

  &::placeholder {
    color: #bebebe;
    transition: all 250ms ease-in-out;
  }
`;

const CloseIcon = styled(motion.span)`
  color: #bebebe;
  font-size: 23px;
  vertical-align: middle;
  transition: all 200ms ease-in-out;
  cursor: pointer;

  &:hover {
    color: #dfdfdf;
  }
`;

const LineSeperator = styled.span`
  display: flex;
  min-width: 100%;
  min-height: 2px;
  background-color: #d8d8d878;
`;

const SearchContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  overflow-y: auto;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WarningMessage = styled.span`
  color: #a1a1a1;
  font-size: 14px;
  display: flex;
  align-self: center;
  justify-self: center;
`;

const containerVariants = {
  expanded: {
    height: '30em',
  },
  collapsed: {
    height: '3.8em',
  },
};

const containerTransition = {
  type: 'spring',
  damping: 22,
  stiffness: 150,
};

const SearchBar = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside();
  const inputRef = useRef();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [tvShows, setTvShows] = useState([]);
  const [noTvShows, setNoTvShows] = useState(false);

  const isEmpty = !tvShows || tvShows.length === 0;

  const changeHandler = (e) => {
    e.preventDefault();
    if (e.target.value.trim() === '') setNoTvShows(false);

    setSearchQuery(e.target.value);
  };

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
    setSearchQuery('');
    setLoading(false);
    setNoTvShows(false);
    setTvShows([]);
    if (inputRef.current) inputRef.current.value = '';
  };

  useEffect(() => {
    if (isClickedOutside) collapseContainer();
  }, [isClickedOutside]);

  const prepareSearchQuery = (query) => {
    const url = `http://api.tvmaze.com/search/shows?q=${query}`;

    return encodeURI(url);
  };

  const searchTvShow = async () => {
    if (!searchQuery || searchQuery.trim() === '') return;

    setLoading(true);
    setNoTvShows(false);

    const URL = prepareSearchQuery(searchQuery);

    const response = await axios.get(URL).catch((error) => {
      console.log('Error', error);
    });

    if (response) {
      console.log('Response', response.data);
      if (response.data && response.data.length === 0) setNoTvShows(true);

      setTvShows(response.data);
    }
    setLoading(false);
  };

  return (
    <SearchBarContainer>
      <SearchInputContainer>
        <SearchIcon></SearchIcon>
        <SearchInput />
        <AnimatePresence></AnimatePresence>
      </SearchInputContainer>
    </SearchBarContainer>
  );
};

export default SearchBar;
