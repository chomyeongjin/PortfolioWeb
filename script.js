// Script for the portfolio
// Add interactivity (e.g., filtering categories) here later.

document.addEventListener('DOMContentLoaded', () => {
  const ring = document.getElementById('ring');
  if (!ring) return; // Only run on pages with the ring

  let rotationY = 0;
  
  // Handle mouse wheel scrolling
  window.addEventListener('wheel', (e) => {
    // Determine scroll direction and amount
    const delta = e.deltaY;
    rotationY -= delta * 0.1; // Adjust multiplier for sensitivity
    updateRotation();
  });

  // Handle dragging (mouse and touch)
  let isDragging = false;
  let startX = 0;
  let currentX = 0;

  const startDrag = (e) => {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    ring.style.transition = 'none'; // Remove transition during drag for smoothness
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault(); // Prevent default touch actions like scrolling
    currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    const diffX = currentX - startX;
    
    // Update rotation directly
    rotationY += diffX * 0.2;
    startX = currentX; // Reset startX for continuous rotation
    updateRotation();
  };

  const endDrag = () => {
    if (!isDragging) return;
    isDragging = false;
    ring.style.transition = 'transform 0.1s ease-out'; // Restore transition
  };

  const scene = document.querySelector('.scene');

  // Mouse Events
  scene.addEventListener('mousedown', startDrag);
  window.addEventListener('mousemove', onDrag);
  window.addEventListener('mouseup', endDrag);
  scene.addEventListener('mouseleave', endDrag);

  // Touch Events
  scene.addEventListener('touchstart', startDrag, { passive: false });
  scene.addEventListener('touchmove', onDrag, { passive: false });
  scene.addEventListener('touchend', endDrag);

  function updateRotation() {
    // Keep a slight X tilt as seen in the reference image
    ring.style.transform = `rotateX(-15deg) rotateY(${rotationY}deg)`;
  }
});
