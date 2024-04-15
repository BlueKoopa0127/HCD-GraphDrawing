import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { d3adaptor, Layout } from 'webcola';

export function D3Graph() {
  console.log('d3Graph');
  const svgRef = useRef(null);
  const [graphData2, setGraphData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('chris.json');
      if (res.status == 200) {
        const text = await res.json();
        console.log(text);
        setGraphData(text);
      }
    };
    fetchData();
  }, []);

  console.log(graphData2);

  useEffect(() => {
    if (!graphData2) return;

    const width = 960;
    const height = 500;
    const nodeRadius = 5;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const d3cola = d3adaptor(d3).avoidOverlaps(true).size([width, height]);

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const nodes = graphData2.nodes;
    const links = graphData2.links;

    // d3cola.nodes(nodes).links(links).start();

    const style = [
      {
        selector: '.link',
        style: {
          width: 1,
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle',
          'curve-style': 'straight',
          opacity: 0.5,
        },
      },
    ];

    d3cola
      .nodes(nodes)
      .links(links)
      .flowLayout('y', 30)
      .symmetricDiffLinkLengths(6)
      .start(20, 20, 20);

    svg
      .append('svg:defs')
      .append('svg:marker')
      .attr('id', 'end-arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 6)
      .attr('markerWidth', 3)
      .attr('markerHeight', 3)
      .attr('orient', 'auto')
      .append('svg:path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#000');

    const link = svg
      .selectAll('.link')
      .data(links)
      .enter()
      .append('svg:path')
      .attr('class', 'link')
      .style('fill', 'none')
      .style('stroke', '#000')
      .style('stroke-width', '1.5px')
      .style('opacity', '0.4')
      .style('marker-end', 'url(#end-arrow)');
    console.log(d3cola.drag.toString());

    const node = svg
      .selectAll('.node')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('r', nodeRadius)
      .style('fill', function (d) {
        return color(d.group);
      })
      .on('drag', (d) => {});
    node.append('title').text((d) => d.name);

    d3cola.on('tick', function () {
      // draw directed edges with proper padding from node centers
      link.attr('d', function (d) {
        var deltaX = d.target.x - d.source.x,
          deltaY = d.target.y - d.source.y,
          dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
          normX = deltaX / dist,
          normY = deltaY / dist,
          sourcePadding = nodeRadius,
          targetPadding = nodeRadius + 2,
          sourceX = d.source.x + sourcePadding * normX,
          sourceY = d.source.y + sourcePadding * normY,
          targetX = d.target.x - targetPadding * normX,
          targetY = d.target.y - targetPadding * normY;
        return 'M' + sourceX + ',' + sourceY + 'L' + targetX + ',' + targetY;
      });

      node
        .attr('cx', function (d) {
          return d.x;
        })
        .attr('cy', function (d) {
          return d.y;
        });
    });
  }, [graphData2]);

  return <svg ref={svgRef} style={{ backgroundColor: '#eee' }}></svg>;
}
