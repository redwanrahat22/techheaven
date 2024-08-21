import  { useState, useEffect } from 'react';

const Toast = ({ message, duration = 5000, onClose }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = 50; // Update progress every 50ms
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev + increment >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    const timeout = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [duration, onClose]);

  return (
    <div className="fixed top-5 right-5 max-w-xs w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
        <span>{message}</span>
        <button
          className="ml-2 text-white hover:text-gray-200"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
      <div className="relative w-full h-1 bg-gray-300">
        <div
          style={{ width: `${progress}%` }}
          className="absolute top-0 left-0 h-full bg-blue-500 transition-all"
        ></div>
      </div>
    </div>
  );
};

export default Toast;
