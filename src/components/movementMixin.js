const movementMixin = {
  data() {
    return {
      delta: {
        top: 0,
        left: 0,
      },
      position: {
        top: 0,
        left: 0,
      },
    };
  },
  methods: {
    dragMouseDown(e) {
      e.preventDefault();

      this.position.left = e.clientX;
      this.position.top = e.clientY;

      document.addEventListener('mousemove', this.elementDrag);
      document.addEventListener('mouseup', this.endDrag);
    },
    elementDrag(e) {
      e.preventDefault();

      this.delta.left = this.position.left - e.clientX;
      this.delta.top = this.position.top - e.clientY;
      this.position.left = e.clientX;
      this.position.top = e.clientY;

      this.moveNode();
    },
    endDrag() {
      document.removeEventListener('mousemove', this.elementDrag);
      document.removeEventListener('mouseup', this.endDrag);
    },
  }
}

export { movementMixin };
