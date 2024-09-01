import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import PropTypes from 'prop-types'

import './LinePlot.css'

const LinePlot = ({ xValues, yValues, xLabel, yLabel, caption }) => {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0})

  const updateDimensions = () => {
    const width = wrapperRef.current.clientWidth
    const aspectRatio = 16 / 10
    const height = width / aspectRatio
    setDimensions({ width, height })
  }

  useEffect(() => {
    updateDimensions()

    window.addEventListener('resize', updateDimensions)
    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    const { width, height } = dimensions
    const margin = {
      top: -height / 8 + (width / 5),
      right: width / 20,
      bottom: height / 8 + (width / 12),
      left: width / 8 }

    svg.selectAll('*').remove()

    const data = xValues.map((x, i) => ({ x, y: yValues[i] }))

    const xScale = d3.scaleBand()
      .domain(data.map(d => d.x))
      .range([margin.left, width - margin.right])
      .padding(0.1)

    const maxY = d3.max(data, d => Number(d.y));
    const tickInterval = 5;

    const yScale = d3.scaleLinear()
      .domain([0, Math.ceil(maxY / tickInterval) * 5])
      .nice()
      .range([height - margin.bottom, margin.top])

    const line = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScale(Number(d.y)))
      .curve(d3.curveMonotoneX)

    svg.append("text")
      .attr("class", "x-label")
      .attr("x", width / 2)
      .attr("y", (height - margin.bottom) + margin.top)
      .attr("text-anchor", "middle")
      .text(xLabel);
    
    svg.attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end")

    svg.append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).tickValues(d3.range(0,
        Math.ceil(maxY / tickInterval) * tickInterval + 1, tickInterval)))
      .selectAll("text")

    svg.append("text")
      .attr("class", "y-label")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", margin.left - margin.right - 10)
      .attr("text-anchor", "middle")
      .text(yLabel);

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 3)
      .attr("d", line);

    svg.append("g")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.name))
      .attr("cy", d => yScale(Number(d.avgMinTemp)))
      .attr("r", 3)
      .attr("fill", "steelblue")

    svg.append("text")
      .attr("class", "caption")
      .attr("x", width / 2)
      .attr("y", height - ((margin.top + margin.bottom) * 2))
      .attr("text-anchor", "middle")
      .text(caption)
  }, [xValues, yValues, dimensions, xLabel, yLabel, caption])

  return (
    <div ref={wrapperRef} className='chart-container'>
      <svg className='plot' ref={svgRef} />
    </div>
  )
}

LinePlot.propTypes = {
  xValues: PropTypes.array,
  yValues: PropTypes.array,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
  caption: PropTypes.string
}

export default LinePlot