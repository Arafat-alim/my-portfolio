import React from "react";

function NavigationDots({ active }) {
  return (
    <div className="app__navigation">
      {["home", "about", "work", "skills", "testimonials", "contact"].map(
        (item, index) => {
          return (
            <a
              href={`#${item}`}
              key={item + index}
              className="app__navigation-dot"
              style={active === item ? { backgroundColor: "blue" } : {}}
            />
          );
        }
      )}
    </div>
  );
}

export default NavigationDots;
