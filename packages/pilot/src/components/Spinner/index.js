import React from 'react'
import styles from './styles.css'

const Spinner = () => (
  <div className={styles.spinner}>
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="50"
        cy="50"
        fill="none"
        r="46.5"
        stroke="#693FCF"
        strokeDasharray="150 30"
        strokeLinecap="round"
        strokeWidth="5.5"
      />
      <circle
        cx="50"
        cy="50"
        fill="none"
        r="35"
        stroke="#a8c038"
        strokeDasharray="50 200"
        strokeLinecap="round"
        strokeWidth="5.5"
      />
    </svg>
  </div>
)

export default Spinner
