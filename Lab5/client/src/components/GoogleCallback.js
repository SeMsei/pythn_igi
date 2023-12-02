import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const GoogleCallbackComp = ({onExit, goBack}) => {
  
  useEffect(() => {
    goBack();
  });
};

export default GoogleCallbackComp;
