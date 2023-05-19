import React from "react";
import "./spinner.css";
import F from './F'
export default function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
      <F/>
    </div>
  );
}