// ShimmerButton: thin wrapper that applies the CSS shimmer animation class; styling is entirely in globals.css / redesign.css.
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
