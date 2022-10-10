//import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <section className="h-screen">
    <div className="px-6 h-full text-gray-800">
      <div
        className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
      >
        <div
          className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
        >
          {/* Cambiar esta imagen del asco */}
          <img
            src="../images/guro_icon.png"
            className="w-full m-auto"
            alt="Sample"
            style={{maxWidth:"50%"}}
          />
        </div>
        <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
          <form>
            <div className="grid grid-rows-2">
              <div id="login_error" className="text-red-500 text-xl font-normal mt-6"></div>
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                  id="guro_username"
                  placeholder="Username"
                />
              </div>
            </div>

            <div className="mb-6">
              <input
                type="password"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                id="password"
                placeholder="Password"
              />
            </div>
  
            <div className="text-center lg:text-left">
              <button
                type="button"
                id="login_button"
                className="inline-block px-7 py-3 bg-green-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
    </div>
  );
}

export default App;
