import logo from './logo.svg';
import './App.css';
import MyComponents from "./components/MyComponents";
import Header from "./components/app_headers";

function App() {
  return (
    <div className="App">

      {/* Top navigation header */}
      <Header />

      {/* Main content */}
      <main className="App-header">

        <img src={logo} className="App-logo" alt="logo" />

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        {/* Your custom components */}
        <MyComponents />

      </main>
      
    </div>
  );
}

export default App;
