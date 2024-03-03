import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';

export function Graph({ data }) {
  const cyRef = useRef(null);
  cytoscape.use(cola); // register extension

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
      layout: { name: 'cola' },
    });

    return () => {
      cy.destroy();
    };
  }, [data]);

  return (
    <div
      style={{ backgroundColor: '#eee', width: '1200px', height: '900px' }}
      ref={cyRef}
    />
  );
}
