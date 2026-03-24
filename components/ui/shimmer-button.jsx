export default function ShimmerButton({ children = "Shimmer", className = "", ...props }) {
  return (
    <button
      type={props.type || "button"}
      className={`shimmer-button ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
