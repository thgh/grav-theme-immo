// Apply class to html tag based on boolean
function classIf(classList, cls, apply) {
  if (apply) {
    !classList.contains(cls) && classList.add(cls)
  } else {
    classList.contains(cls) && classList.remove(cls)
  }
}
