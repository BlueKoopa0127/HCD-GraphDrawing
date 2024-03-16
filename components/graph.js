import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';

export function Graph({ data }) {
  const cyRef = useRef(null);
  cytoscape.use(cola); // register extension

  useEffect(() => {
    if (data.length != 0) {
      const groupsName = ['BA', 'La', 'INA'];
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
          group: e.group,
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
            'background-color': '#00FFFF',
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
            'curve-style': 'straight',
          },
        },
        {
          selector: '.parent',
          style: {
            'background-color': '#EEEE00',
          },
        },
      ];

      const cy = cytoscape({
        container: cyRef.current,
        elements: elements,
        style: style,
      });
      const input = cy.nodes('node[id = "CS_input"], node[id = "US_input"]');
      const la = cy.nodes('node[id = "LaV"],node[id = "LaD"]');
      const ina = cy.nodes('node[id = "INAvm"],node[id = "INAdm"]');
      const ba = cy.nodes('node[id = "BA_F"],node[id = "BA_E"]');
      console.log(input);
      console.log(la);
      console.log(ina);
      console.log(ba);

      cy.edges().on('click', (event) => {
        const edge = event.target;
        console.log('edge clicked', edge.id());
      });

      cy.layout({
        name: 'cola',
        randomize: false,
        fit: true,
        maxSimulationTime: 2000,
        avoidOverlaps: true,
        edgeLength: 50,
        nodeSpacing: 50,
        convergenceThreshold: 0.01,
        alignment: {
          vertical: [
            [{ node: input[0] }, { node: input[1] }],
            [{ node: la[0] }, { node: la[1] }],
            [{ node: ba[0] }, { node: ba[1] }],
          ],
          horizontal: [
            [{ node: input[0] }, { node: la[0] }, { node: ba[0] }],
            [{ node: input[1] }, { node: la[1] }, { node: ba[1] }],
            [{ node: ina[0] }, { node: ina[1] }],
          ],
        },
        gapInequalities: [
          {
            axis: 'x',
            left: input[0],
            right: la[0],
            gap: 100,
          },
          {
            axis: 'x',
            left: la[0],
            right: ina[0],
            gap: 100,
          },
          {
            axis: 'x',
            left: ina[0],
            right: ba[0],
            gap: 100,
          },
          {
            axis: 'x',
            left: la[0],
            right: ina[1],
            gap: 100,
          },
          {
            axis: 'x',
            left: ina[1],
            right: ba[0],
            gap: 100,
          },
          {
            axis: 'x',
            left: ina[1],
            right: ina[0],
            gap: 100,
          },
          {
            axis: 'y',
            left: ina[0],
            right: ba[0],
            gap: 100,
          },
          {
            axis: 'y',
            left: ina[0],
            right: ba[1],
            gap: 100,
          },
        ],
      }).run();

      return () => {
        cy.destroy();
      };
    }
  }, [data]);

  return (
    <div
      style={{ backgroundColor: '#eee', width: '1200px', height: '900px' }}
      ref={cyRef}
    />
  );
}
