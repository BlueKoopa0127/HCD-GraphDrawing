import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';
import cyDagre from 'cytoscape-dagre';
import dagre from '@dagrejs/dagre';

export function Graph({ data }) {
  const cyRef = useRef(null);
  cytoscape.use(cyDagre); // register extension

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
      const gap = hierarchyAry
        .map((e) => {
          return cy.nodes(`node[hierarchy = ${e}]`);
        })
        .map((e, i, ary) => {
          // return e.map((f) => {
          //   return {
          //     axis: 'x',
          //     left: ary[i - 1][0],
          //     right: ary[i][0],
          //     gap: 100,
          //   };
          // });
          if (0 < i) {
            return {
              axis: 'y',
              left: ary[i - 1][0],
              right: ary[i][0],
              gap: 100,
            };
          } else {
            return {
              axis: 'y',
              left: ary[ary.length - 1][0],
              right: ary[i][0],
              gap: 1000,
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
        //name: 'cola',
        name: 'dagre',
        randomize: false,
        fit: true,
        maxSimulationTime: 2000,
        avoidOverlaps: true,
        edgeLength: 50,
        nodeSpacing: 50,
        convergenceThreshold: 0.01,
        // acyclicer: 'greedy',
        ranker: 'network-simplex',
        animate: true,
        alignment: { horizontal: hierarchy },
        gapInequalities: gap,
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
