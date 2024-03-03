import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';

export function Graph({ data }) {
  const cyRef = useRef(null);

  useEffect(() => {
    const elements = data;

    console.log(elements);

    const style = [
      {
        selector: 'node',
        style: {
          'background-color': '#666',
          label: 'data(label)',
        },
      },
      {
        selector: 'edge',
        style: {
          width: 3,
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle',
        },
      },
    ];

    const cy = cytoscape({
      container: cyRef.current,
      elements: elements,
      style: style,
      layout: { name: 'grid' },
    });

    return () => {
      cy.destroy();
    };
  }, [data]);

  return (
    <div
      style={{ backgroundColor: '#eee', width: '800px', height: '800px' }}
      ref={cyRef}
    />
  );
}
