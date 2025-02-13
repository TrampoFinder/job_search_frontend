import { RoutesComponent } from "./routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <RoutesComponent />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
