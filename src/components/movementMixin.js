const movementMixin = {
  data() {
    return {
      isTicking: false,
      delta: {
        top: 0,
        left: 0,
      },
    };
  },
  methods: {
    dragMouseDown(e) {
      e.preventDefault();

      document.addEventListener('mousemove', this.elementDrag, false);
      document.addEventListener('mouseup', this.endDrag, false);
      // @todo: add touch support
      // document.addEventListener('touchmove', this.elementDrag, false);
      // document.addEventListener('touchend', this.endDrag, false);
    },
    elementDrag(e) {
      e.preventDefault();

      this.delta.top += e.movementY;
      this.delta.left += e.movementX;
      
      if (!this.isTicking) {
        window.requestAnimationFrame(() => {
          this.moveNode();
          this.isTicking = false;
          this.delta.top = 0;
          this.delta.left = 0;
        });

        this.isTicking = true;
      }
    },
    endDrag() {
      document.removeEventListener('mousemove', this.elementDrag);
      document.removeEventListener('mouseup', this.endDrag);
      // document.removeEventListener('touchmove', this.elementDrag);
      // document.removeEventListener('touchend', this.endDrag);
    },
  }
}

export { movementMixin };
