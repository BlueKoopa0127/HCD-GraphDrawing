import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';

export function Graph({ data }) {
  const cyRef = useRef(null);
  cytoscape.use(cola); // register extension

  useEffect(() => {
    const groupsName = ['PoFC', 'Cx', 'VA', 'In', 'Au', 'M1', 'LEC'];
    const groups = groupsName.map((e) => {
      return {
        group: 'nodes',
        classes: ['parent'],
        data: { id: e + 'Parent', label: e },
      };
    });
    const groupData = data.map((e) => {
      if (e.group == 'edges') return e;
      const parent = groups.find((g) => e.data.id.includes(g.data.label));
      if (parent == undefined) {
        return e;
      }
      return {
        groups: e.groups,
        data: {
          id: e.data.id,
          label: e.data.label,
          parent: parent.data.id,
        },
      };
    });
    const elements = groups.concat(groupData);
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
