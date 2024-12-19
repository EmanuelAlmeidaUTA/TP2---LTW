function Header() {
  return (
    <div className="flex font-bold text-lg justify-between mt-4 px-4">
      <span className="text-black">TP2</span>
      <div className="flex space-x-4">
        <button className="px-4 py-2 text-sm text-white bg-black rounded hover:bg-gray-800">
          Sign Up
        </button>
        <button className="px-4 py-2 text-sm text-white bg-orange-500 rounded hover:bg-orange-600">
          Login
        </button>
      </div>
    </div>
  );
}

export default Header;

