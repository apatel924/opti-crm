// Add the Ghibli colors to the tailwind config to ensure they're available
module.exports = {
    // ... other tailwind config
    theme: {
      extend: {
        colors: {
          "ghibli-blue": "#4285F4",
          "ghibli-blue-light": "#7BAAF7",
          "ghibli-green": "#34A853",
          "ghibli-green-light": "#80C48C",
          "ghibli-yellow": "#FBBC05",
          "ghibli-yellow-light": "#FDE293",
          "ghibli-brown": "#B06500",
          "ghibli-cream": "#F9F7E8",
          "ghibli-pink": "#EA4335",
          "ghibli-pink-light": "#F28B82",
        },
        animation: {
          float: "float 6s ease-in-out infinite",
        },
        keyframes: {
          float: {
            "0%, 100%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-10px)" },
          },
        },
      },
    },
  }
  