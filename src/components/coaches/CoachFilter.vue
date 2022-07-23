<template>
  <base-card>
    <h2>CoachFilter</h2>
    <span class="filter-option">
      <input type="checkbox" id="fronted" checked @change="updateFilters" />
      <label for="fronted">Fronted</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="backend" checked @change="updateFilters" />
      <label for="backend">Backend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="career" checked @change="updateFilters" />
      <label for="career">Career</label>
    </span>
  </base-card>
</template>
<script>
export default {
  emits: ["change-filters"],
  data() {
    return {
      filters: {
        fronted: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    updateFilters(event) {
      const inputId = event.target.id;
      const isActive = event.target.checked;
      const updatedFilters = {
        ...this.filters,
        [inputId]: isActive,
      };
      this.filters = updatedFilters;
      this.$emit("change-filters", updatedFilters);
    },
  },
};
</script>
<style scoped></style>
