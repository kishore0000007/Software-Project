const Card = ({ title, children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-slate-200 p-6 ${className}`}
    >
      {title && (
        <h2 className="text-xl font-semibold text-slate-800 mb-5">
          {title}
        </h2>
      )}

      {children}
    </div>
  );
};

export default Card;