export function normalize(point) {
  const magnitude = Math.sqrt((point.x * point.x) + (point.y * point.y));
  point.x = point.x / magnitude;
  point.y = point.y / magnitude;

  return point;
}

export function mix3(vec1, vec2, value) {
  return new THREE.Vector3(
    vec1.x + (vec2.x - vec1.x) * value,
    vec1.y + (vec2.y - vec1.y) * value,
    vec1.z + (vec2.z - vec1.z) * value,
  )
}
