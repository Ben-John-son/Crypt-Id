'use client';

import * as d3 from 'd3';
import { feature, mesh } from 'topojson-client';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function UsMap({ onStateClick }) {
  const svgRef = useRef();

  useEffect(() => {
    const width = 975;
    const height = 610;

    const svg = d3.select(svgRef.current).attr('viewBox', [0, 0, width, height]).attr('width', width).attr('height', height).style('max-width', '100%').style('height', 'auto');

    const g = svg.append('g');
    const path = d3.geoPath();

    // const zoom = d3
    //   .zoom()
    //   .scaleExtent([1, 8])
    //   .on('zoom', (event) => {
    //     g.attr('transform', event.transform);
    //     g.attr('stroke-width', 1 / event.transform.k);
    //   });

    // svg.call(zoom);

    d3.json('/us.json').then((us) => {
      const stateFeatures = feature(us, us.objects.states).features;

      const states = g
        .append('g')
        .attr('fill', 'rgb(76 204 106)')
        .attr('cursor', 'pointer')
        .selectAll('path')
        .data(stateFeatures)
        .join('path')
        .attr('d', path)
        .on('click', function (event, d) {
          // const [[x0, y0], [x1, y1]] = path.bounds(d);if MAP IS NOT WORKING CORRECTLY, UNCOMMENT THIS SECTION!!!!!!!!!!
          event.stopPropagation();

          // Notify parent
          onStateClick(d.properties.name);

          // Highlight selected state
          states.transition().style('fill', ' rgb(23, 113, 44)');
          d3.select(this).transition().style('fill', 'rgb(220, 88, 40)');
        });

      states.append('title').text((d) => d.properties.name);

      g.append('path')
        .attr('fill', 'none')
        .attr('stroke', 'white')
        .attr('stroke-linejoin', 'round')
        .attr('d', path(mesh(us, us.objects.states, (a, b) => a !== b)));

      // Add state labels
      g.append('g')
        .attr('class', 'state-labels')
        .selectAll('text')
        .data(stateFeatures)
        .join('text')
        .attr('transform', (d) => {
          const [x, y] = path.centroid(d);
          return `translate(${x},${y})`;
        })
        .attr('text-anchor', 'middle')
        .attr('font-size', 10)
        .attr('fill', 'rgb(220, 88, 40)')
        .attr('font-family', 'courier')
        .attr('pointer-events', 'none')
        .text((d) => d.properties.name);

      // svg.on('click', () => {
      //   states.transition().style('fill', '#444');
      //   svg
      //     .transition()
      //     .duration(750)
      //     .call(zoom.transform, d3.zoomIdentity, d3.zoomTransform(svg.node()).invert([width / 2, height / 2]));
      // });
    });

    return () => {
      d3.select(svgRef.current).selectAll('*').remove();
    };
  }, []);

  return <svg ref={svgRef} style={{ backgroundColor: 'black' }} />;
}

UsMap.propTypes = {
  onStateClick: PropTypes.func.isRequired,
};
