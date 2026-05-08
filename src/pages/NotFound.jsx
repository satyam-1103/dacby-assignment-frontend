import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen py-12 px-4 sm:py-16 bg-transparent">
      <div className="max-w-3xl mx-auto">
        <div className="card-shadow-retro bg-white border-2 border-black/20 p-10 rounded-xl text-center">
          <div className="text-6xl mb-4">❓</div>
          <h1 className="text-3xl font-retro font-bold mb-2">Page Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find the page you're looking for.</p>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="btn-retro bg-black text-white px-6 py-3 rounded-lg font-medium"
            >
              Back to Home
            </button>

            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-lg border-2 border-black/20 text-black bg-white hover:bg-gray-50 transition"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
