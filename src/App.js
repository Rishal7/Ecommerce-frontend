import { AllRoutes } from "./routes/Allroutes";
import "./App.css";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <AllRoutes />
    </div>
  );
}

export default App;
