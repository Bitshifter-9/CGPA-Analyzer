const DashboardHero = ({ username, title, subtitle }) => {
  return (
    <div className="border-b border-gray-100 bg-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-2">
            {title || `Welcome back, ${username}!`}
          </h1>
          <p className="text-gray-600 text-lg">
            {subtitle || "Here's what's happening with your academic performance today."}
          </p>
        </div>
      </div>
    </div >
  );
};

export default DashboardHero;
