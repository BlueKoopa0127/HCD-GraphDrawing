import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';
import cyDagre from 'cytoscape-dagre';
import dagre from '@dagrejs/dagre';

export function Graph({ data }) {
  const cyRef = useRef(null);
  cytoscape.use(cola); // register extension

  useEffect(() => {
    if (data.length != 0) {
      // const groupsName = data
      //   .map((e) => e.data.hierarchy)
      //   .sort((a, b) => a - b);
      // const groups = groupsName.map((e) => {
      //   return {
      //     group: 'nodes',
      //     classes: ['parent'],
      //     data: { id: e + 'Parent', label: e, hierarchy: e },
      //   };
      // });
      // const groupData = data.map((e) => {
      //   if (e.group == 'edges') return e;
      //   const parent = groups.find((g) => e.data.hierarchy == g.data.hierarchy);
      //   if (parent == undefined) {
      //     return e;
      //   }
      //   return {
      //     group: e.group,
      //     data: {
      //       id: e.data.id,
      //       label: e.data.label,
      //       hierarchy: e.data.hierarchy,
      //       parent: parent.data.id,
      //     },
      //   };
      // });
      // const elements = groups.concat(groupData);
      const elements = data;
      //console.log(elements);

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
            width: 1,
            'line-color': '#aaa',
            'target-arrow-color': '#aaa',
            'target-arrow-shape': 'triangle',
            'curve-style': 'straight',
            opacity: 0.8,
          },
        },
        {
          selector: '.parent',
          style: {
            'background-color': '#EEEE00',
          },
        },
        {
          selector: '.removed',
          style: {
            'background-color': '#ff0000',
          },
        },
        {
          selector: '.removedEdge',
          style: {
            'line-color': '#ff0000',
            'target-arrow-color': '#ff0000',
            'target-arrow-shape': 'triangle',
            'curve-style': 'straight',
            width: 1,
            opacity: 0.5,
          },
        },
      ];

      const cy = cytoscape({
        container: cyRef.current,
        elements: elements,
        style: style,
      });
      console.log(cy.nodes());

      // const input = cy.nodes('node[id = "CS_input"], node[id = "US_input"]');
      // const la = cy.nodes('node[id = "LaV"],node[id = "LaD"]');
      // const ina = cy.nodes('node[id = "INAvm"],node[id = "INAdm"]');
      // const ba = cy.nodes('node[id = "BA_F"],node[id = "BA_E"]');
      // console.log(input);
      // console.log(la);
      // console.log(ina);
      // console.log(ba);

      // cy.nodes().forEach((e) => {
      //   const edges = e._private.edges;
      //   const dPlus = edges.filter((f) => f._private.source == e).length;
      //   const dMinus = edges.filter((f) => f._private.target == e).length;
      //   e.data({ dPlus: dPlus });
      //   e.data('dMinus', dMinus);
      // });

      const hierarchyAry = [
        ...new Set(cy.nodes().map((e) => e._private.data.hierarchy)),
      ].sort((a, b) => a - b);
      console.log(hierarchyAry);

      const hierarchy = hierarchyAry.map((e) => {
        return cy.nodes(`node[hierarchy = ${e}]`).map((f) => {
          return {
            node: f,
          };
        });
      });
      console.log(hierarchy);

      const gap = cy.edges().map((e) => {
        const s = e._private.source;
        const sH = s._private.data.hierarchy;
        const t = e._private.target;
        const tH = t._private.data.hierarchy;
        if (sH < tH) {
          return {
            axis: 'y',
            left: s,
            right: t,
            gap: 25,
          };
        } else if (sH == tH) {
          return {
            axis: 'y',
            left: s,
            right: t,
            gap: 0,
            equality: 'true',
          };
        } else {
          return {
            axis: 'y',
            left: t,
            right: s,
            gap: 25,
          };
        }
      });
      console.log(gap);

      cy.nodes().on('click', (event) => {
        const node = event.target;
        console.log('node clicked', node._private.data.hierarchy, node);
      });
      cy.edges().on('click', (event) => {
        const edge = event.target;
        console.log('edge clicked', edge._private.data.id, edge);
      });

      cy.layout({
        name: 'cola',
        // name: 'dagre',
        randomize: false,
        fit: true,
        flow: { axis: 'y', minSeparation: 30 }, // use DAG/tree flow layout if specified, e.g. { axis: 'y', minSeparation: 30 }
        maxSimulationTime: 8000,
        // avoidOverlaps: true,
        // edgeLength: 50,
        nodeSpacing: 20,
        convergenceThreshold: 0.01,
        // acyclicer: 'greedy',
        // ranker: 'network-simplex',
        // animate: true,
        // alignment: { horizontal: hierarchy },
        // gapInequalities: gap,
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
