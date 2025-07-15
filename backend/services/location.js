const turf = require('@turf/turf');

// Calculate distance between two points in kilometers
exports.calculateDistance = (point1, point2) => {
  const from = turf.point(point1);
  const to = turf.point(point2);
  return turf.distance(from, to, { units: 'kilometers' });
};

// Estimate travel time in minutes based on distance
exports.estimateTravelTime = (distanceKm, trafficFactor = 1.2) => {
  const averageSpeedKmH = 40; // Average speed in km/h
  return Math.round((distanceKm / averageSpeedKmH) * 60 * trafficFactor);
};

// Find midpoint between two locations
exports.findMidpoint = (point1, point2) => {
  const line = turf.lineString([point1, point2]);
  const midpoint = turf.midpoint(line);
  return midpoint.geometry.coordinates;
};