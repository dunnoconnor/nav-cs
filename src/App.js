import { Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import SchoolDetail from './components/SchoolDetail'
import Footer from './components/Footer';
import Main from './components/Main';
function App() {

  return (
    <div className="App">
      <Header/>
      
      <Route
          path="/"
          exact
          component={Main}
        />
        
      <Route
          path="/:id"
          exact
          render={(routerProps) =>
            <SchoolDetail
              match={routerProps.match}
            />
          }
        />

      <Footer/>
    </div>
  );
}

export default App;
