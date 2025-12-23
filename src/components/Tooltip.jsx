import React, { useState, useRef, useEffect } from "react";
import theme from "../styles/theme";

function Tooltip({ children, text, position = "top" }) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (isVisible && tooltipRef.current && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      let top, left;
      
      switch (position) {
        case "top":
          top = triggerRect.top - tooltipRect.height - 8;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case "bottom":
          top = triggerRect.bottom + 8;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case "left":
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.left - tooltipRect.width - 8;
          break;
        case "right":
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.right + 8;
          break;
        default:
          top = triggerRect.top - tooltipRect.height - 8;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
      }
      
      setTooltipStyle({ top: `${top}px`, left: `${left}px` });
    }
  }, [isVisible, position]);

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        style={styles.trigger}
      >
        {children}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          style={{
            ...styles.tooltip,
            ...tooltipStyle,
          }}
          className="fade-in"
        >
          {text}
        </div>
      )}
    </>
  );
}

const styles = {
  trigger: {
    display: "inline-block",
  },
  tooltip: {
    position: "fixed",
    backgroundColor: theme.colors.neutral.gray900,
    color: theme.colors.text.inverse,
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    borderRadius: theme.borderRadius.md,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    boxShadow: theme.shadows.lg,
    zIndex: 10001,
    pointerEvents: "none",
    whiteSpace: "nowrap",
    maxWidth: "200px",
  },
};

export default Tooltip;

