import React from 'react'

import '../styles/Units.css'

/**
 * Select which units of measurement to use
 */
export default function Units(props) {
	const { updateUnits, units } = props;

	return (
      <div className="Units">
        <button
          className={units === "metric" ? "selected" : ""}
          value="metric"
          onClick={updateUnits}
        >
          metric
        </button>
        <span>/</span>
        <button
          className={units === "imperial" ? "selected" : ""}
          value="imperial"
          onClick={updateUnits}
        >
          imperial
        </button>
        <span>/</span>
        <button
          className={units === "kelvin" ? "selected" : ""}
          value="kelvin"
          onClick={updateUnits}
        >
          kelvin
        </button>
      </div>
    );
}
