import { reactive } from 'vue';
export const EventBus = reactive({
  events: {},
  emit(event, data) {
    this.events[event]?.forEach(callback => callback(data));
  },
  on(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  }
});
