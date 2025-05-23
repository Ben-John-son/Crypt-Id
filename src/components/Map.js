'use client';

import * as d3 from 'd3';
import { feature, mesh } from 'topojson-client';
import { useEffect, useRef } from 'react';

export default function UsMap() {
  const svgRef = useRef();

  useEffect(() => {
    const width = 975;
    const height = 610;

    const svg = d3.select(svgRef.current).attr('viewBox', [0, 0, width, height]).attr('width', width).attr('height', height).style('max-width', '100%').style('height', 'auto');

    const g = svg.append('g');
    const path = d3.geoPath();

    const zoom = d3
      .zoom()
      .scaleExtent([1, 8])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
        g.attr('stroke-width', 1 / event.transform.k);
      });

    svg.call(zoom);

    d3.json('/us.json').then((us) => {
      const stateFeatures = feature(us, us.objects.states).features;

      const states = g
        .append('g')
        .attr('fill', '#444')
        .attr('cursor', 'pointer')
        .selectAll('path')
        .data(stateFeatures)
        .join('path')
        .attr('d', path)
        .on('click', (event) => {
          // const [[x0, y0], [x1, y1]] = path.bounds(d);
          event.stopPropagation();

          // Reset all state fill
          states.transition().style('fill', '#444');

          // Highlight selected state
          d3.select(this).transition().style('fill', 'red');

          // Zoom to the selected state
          // svg.transition().duration(750).call(
          //   zoom.transform,
          //   d3.zoomIdentity
          //     .translate(width / 2, height / 2)
          //     .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
          //     .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
          //   d3.pointer(event, svg.node()),
          // );
        });

      states.append('title').text((d) => d.properties.name);

      // Draw state borders
      g.append('path')
        .attr('fill', 'none')
        .attr('stroke', 'white')
        .attr('stroke-linejoin', 'round')
        .attr('d', path(mesh(us, us.objects.states, (a, b) => a !== b)));

      // Reset zoom on empty space click
      svg.on('click', () => {
        states.transition().style('fill', '#444');
        svg
          .transition()
          .duration(750)
          .call(zoom.transform, d3.zoomIdentity, d3.zoomTransform(svg.node()).invert([width / 2, height / 2]));
      });
    });

    // ✅ Clean up on unmount
    return () => {
      d3.select(svgRef.current).selectAll('*').remove();
    };
  }, []);

  return <svg ref={svgRef} />;
}
