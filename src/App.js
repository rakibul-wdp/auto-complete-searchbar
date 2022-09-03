import styled from 'styled-components';
import SearchBar from './components/SearchBar';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-top: 8em;
`;

function App() {
  return (
    <AppContainer>
      <SearchBar />
    </AppContainer>
  );
}

export default App;
