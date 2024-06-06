// import logo from './logo.svg';
import './App.css';
import Search from './components/search-bar.tsx';
import Results from './components/results.tsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        ja<span style={{ color: "violet" }}>mmm</span>ing
      </header>

      <form className='Search-form'>
        <Search/>
        <input className='button' type="submit" value="SEARCH"/>
      </form>

      <div className="Container-main">
        <div className="Container-results">
          <Results/>
        </div>
        <div className="Container-results">
          x
        </div>
      </div>
    </div>
  );
}

export default App;
