<script>
import * as d3 from "d3";
import * as topojson from "topojson";
import koreanMap from "@/assets/skorea_municipalities_topo_simple.json";
import pin from "@/assets/location-pin-solid.png";

export default {
  name: "Map",
  props: ["latitude", "longitude"],
  mounted() {
    this.drawMap();
  },

  methods: {
    async drawMap(props) {
      const currentLoc = [
        {
          name: "now",
          lat: this.latitude + 0.4,
          lon: this.longitude - 0.3,
        },
      ];

      const features = topojson.feature(
        koreanMap,
        koreanMap.objects.municipalities_geo
      ).features;

      const svg = d3
        .select(this.$refs.map)
        .append("svg")
        .attr("width", 600)
        .attr("height", 400);

      const projection = d3
        .geoMercator()
        .fitSize([600, 400], { type: "FeatureCollection", features });
      const path = d3.geoPath().projection(projection);

      svg
        .selectAll("path")
        .data(features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "gray")
        .attr("stroke", "white")
        .attr("stroke-width", 0.5);

      const icons = svg
        .append("g")
        .selectAll("svg")
        .data(currentLoc)
        .enter()
        .append("svg:image")
        .attr("width", 30)
        .attr("height", 30)
        .attr("x", (d) => projection([d.lon, d.lat])[0])
        .attr("y", (d) => projection([d.lon, d.lat])[1] + 30)
        .attr("opacity", 0)
        .attr(":href", pin)
        .transition()
        .ease(d3.easeElastic)
        .duration(2000)
        .delay((d, i) => i * 50)
        .attr("opacity", 1)
        .attr("y", (d) => projection([d.lon, d.lat])[1]);

    },
  },
};
</script>

<template>
  <main>
    <div ref="map"></div>
  </main>
</template>

<style scoped>
main {
  margin-left: 60px;
}
</style>
