export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-10 backdrop-blur-md z-50">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 animate-ping rounded-full border-4 border-[#3b9df8] opacity-75"></div>
        <div className="absolute w-10 h-10 animate-ping animation-delay-200 rounded-full border-4 border-[#3b9df8] opacity-50"></div>
        <div className="absolute w-8 h-8 animate-ping animation-delay-400 rounded-full border-4 border-[#3b9df8] opacity-25"></div>
      </div>
    </div>
  );
}
