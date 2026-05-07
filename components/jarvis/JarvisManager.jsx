"use client";

import React, { useState } from 'react';
import JarvisTrigger from './JarvisTrigger';
import JarvisChatPanel from './JarvisChatPanel';

const JarvisManager = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleJarvis = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <JarvisTrigger onClick={toggleJarvis} isOpen={isOpen} />
      <JarvisChatPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default JarvisManager;
