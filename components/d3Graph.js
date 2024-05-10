import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { d3adaptor, Layout } from 'webcola';
import dagre from '@dagrejs/dagre';

export function D3Graph({ data }) {
  console.log('d3Graph');
  console.log(data);
  const svgRef = useRef(null);
  const [graphData2, setGraphData] = useState();

  useEffect(() => {
    var g = new dagre.graphlib.Graph();

    // Set an object for the graph label
    g.setGraph({});

    // Default to assigning a new object as a label for each new edge.
    g.setDefaultEdgeLabel(function () {
      return {};
    });

    data.forEach((e) => {
      if (e.group == 'nodes') {
        g.setNode(e.data.label, {
          label: e.data.label,
          width: 10,
          height: 10,
        });
      } else {
        g.setEdge(e.data.source, e.data.target);
      }
    });
    dagre.layout(g);

    // // Add nodes to the graph. The first argument is the node id. The second is
    // // metadata about the node. In this case we're going to add labels to each of
    // // our nodes.
    // g.setNode('kspacey', { label: 'Kevin Spacey', width: 144, height: 100 });
    // g.setNode('swilliams', { label: 'Saul Williams', width: 160, height: 100 });
    // g.setNode('bpitt', { label: 'Brad Pitt', width: 108, height: 100 });
    // g.setNode('hford', { label: 'Harrison Ford', width: 168, height: 100 });
    // g.setNode('lwilson', { label: 'Luke Wilson', width: 144, height: 100 });
    // g.setNode('kbacon', { label: 'Kevin Bacon', width: 121, height: 100 });

    // // Add edges to the graph.
    // g.setEdge('kspacey', 'swilliams');
    // g.setEdge('swilliams', 'kbacon');
    // g.setEdge('bpitt', 'kbacon');
    // g.setEdge('hford', 'lwilson');
    // g.setEdge('lwilson', 'kbacon');

    g.nodes().forEach(function (v) {
      console.log('Node ' + v + ': ' + JSON.stringify(g.node(v)));
    });
    g.edges().forEach(function (e) {
      console.log(
        'Edge ' + e.v + ' -> ' + e.w + ': ' + JSON.stringify(g.edge(e)),
      );
    });
    setGraphData(g);

    // Render the graph
  }, [data]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch('chris.json');
  //     if (res.status == 200) {
  //       const text = await res.json();
  //       console.log(text);
  //       setGraphData(text);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // console.log(graphData2);

  // useEffect(() => {
  //   if (!data) return;

  //   const width = 960;
  //   const height = 500;
  //   const nodeRadius = 5;

  //   const color = d3.scaleOrdinal(d3.schemeCategory10);

  //   const d3cola = d3adaptor(d3).avoidOverlaps(true).size([width, height]);

  //   const svg = d3
  //     .select(svgRef.current)
  //     .attr('width', width)
  //     .attr('height', height);

  //   var g = new dagre.graphlib.Graph();

  //   // Set an object for the graph label
  //   g.setGraph({});

  //   // Default to assigning a new object as a label for each new edge.
  //   g.setDefaultEdgeLabel(function () {
  //     return {};
  //   });

  //   data.forEach((e) => {
  //     if (e.group == 'nodes') {
  //       g.setNode(e.data.label, {
  //         name: e.data.label,
  //         width: 100,
  //         height: 100,
  //       });
  //     } else {
  //       g.setEdge(e.data.source, e.data.target);
  //     }
  //   });
  //   dagre.layout(g);

  //   console.log(g.nodes().map((e) => g.node(e)));
  //   console.log(g.edges().map((e) => g.edge(e)));
  //   console.log(graphData2);
  //   const nodes = g.nodes().map((e) => g.node(e));
  //   const links = g.edges().map((e) => g.edge(e));

  //   // d3cola.nodes(nodes).links(links).start();

  //   const style = [
  //     {
  //       selector: '.link',
  //       style: {
  //         width: 1,
  //         'line-color': '#ccc',
  //         'target-arrow-color': '#ccc',
  //         'target-arrow-shape': 'triangle',
  //         'curve-style': 'straight',
  //         opacity: 0.5,
  //       },
  //     },
  //   ];

  //   d3cola
  //     .nodes(nodes)
  //     .links(links)
  //     .flowLayout('y', 30)
  //     .symmetricDiffLinkLengths(6)
  //     .start(20, 20, 20);

  //   svg
  //     .append('svg:defs')
  //     .append('svg:marker')
  //     .attr('id', 'end-arrow')
  //     .attr('viewBox', '0 -5 10 10')
  //     .attr('refX', 6)
  //     .attr('markerWidth', 3)
  //     .attr('markerHeight', 3)
  //     .attr('orient', 'auto')
  //     .append('svg:path')
  //     .attr('d', 'M0,-5L10,0L0,5')
  //     .attr('fill', '#000');

  //   const link = svg
  //     .selectAll('.link')
  //     .data(links)
  //     .enter()
  //     .append('svg:path')
  //     .attr('class', 'link')
  //     .style('fill', 'none')
  //     .style('stroke', '#000')
  //     .style('stroke-width', '1.5px')
  //     .style('opacity', '0.4')
  //     .style('marker-end', 'url(#end-arrow)');
  //   console.log(d3cola.drag.toString());

  //   const node = svg
  //     .selectAll('.node')
  //     .data(nodes)
  //     .enter()
  //     .append('circle')
  //     .attr('class', 'node')
  //     .attr('r', nodeRadius)
  //     .style('fill', function (d) {
  //       return color(d.group);
  //     })
  //     .on('drag', (d) => {});
  //   node.append('title').text((d) => d.name);

  //   d3cola.on('tick', function () {
  //     // draw directed edges with proper padding from node centers
  //     link.attr('d', function (d) {
  //       var deltaX = d.target.x - d.source.x,
  //         deltaY = d.target.y - d.source.y,
  //         dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
  //         normX = deltaX / dist,
  //         normY = deltaY / dist,
  //         sourcePadding = nodeRadius,
  //         targetPadding = nodeRadius + 2,
  //         sourceX = d.source.x + sourcePadding * normX,
  //         sourceY = d.source.y + sourcePadding * normY,
  //         targetX = d.target.x - targetPadding * normX,
  //         targetY = d.target.y - targetPadding * normY;
  //       return 'M' + sourceX + ',' + sourceY + 'L' + targetX + ',' + targetY;
  //     });

  //     node
  //       .attr('cx', function (d) {
  //         return d.x;
  //       })
  //       .attr('cy', function (d) {
  //         return d.y;
  //       });
  //   });
  // }, [data]);

  if (graphData2 == undefined) {
    return <></>;
  }
  return (
    <svg
      ref={svgRef}
      width="1000"
      height="1000"
      style={{ backgroundColor: '#eee' }}
    >
      {graphData2.nodes().map((e) => {
        const n = graphData2.node(e);
        return (
          <g>
            <circle cx={n.x} cy={n.y} r={n.width} fill="black" />
          </g>
        );
      })}
    </svg>
  );
}
