
const Logout = () => {
  const logoutHandler = () => {
    localStorage.removeItem("token");
    window.location.reload()
  };

  return (
    <div className="w-full p-5 ">
      <button
        onClick={logoutHandler}
        className="w-full border-red-500 p-1.5 rounded bg-red-600/20 hover:bg-red-800/60 text-red-500 text-center border"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
