import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';

export function Graph({ data }) {
  const cyRef = useRef(null);
  cytoscape.use(cola); // register extension

  useEffect(() => {
    const groups = [
      {
        group: 'nodes',
        data: { id: 'group1', label: 'group1', parent: 'group' },
      },
      {
        group: 'nodes',
        data: { id: 'group2', label: 'group2', parent: 'group' },
      },
      {
        group: 'nodes',
        classes: ['parent'],
        data: { id: 'group', label: 'group' },
      },
    ];
    const elements = data.concat(groups);

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
      {
        selector: '.parent',
        style: {
          'background-color': '#FF00FF',
        },
      },
    ];

    const cy = cytoscape({
      container: cyRef.current,
      elements: elements,
      style: style,
    });
    cy.layout({
      name: 'cola',
      maxSimulationTime: 8000,
      avoidOverlaps: true,
    }).run();

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
