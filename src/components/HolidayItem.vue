<template>
  <div class="holiday-card">
    <span v-show="holiday.type === 'Больничный'" class="priority-label priority-critical">
      {{ holiday.type }}
    </span>
    <span v-show="holiday.type === 'Отпуск'" class="priority-label priority-normal">
      {{ holiday.type }}
    </span>
    <h4 style="color: rgb(0, 116, 188); margin-top: 10px; margin-bottom: 10px;">Выбранный период:</h4>
    <div class="card flex justify-content-center">
      <Calendar 
        v-model="selectedDates"
        selectionMode="range" 
        :manualInput="false" 
        dateFormat="dd.mm.yy"
        @update:modelValue="handleDateChange"
      />
      <button class="details-button" style='display: inline;float: right;' @click="deleteHoliday">Удалить</button>
    </div>
    
  </div>
</template>

<script>
import { ref} from "vue";
import Calendar from 'primevue/calendar';
import { useStore } from 'vuex';
export default {
  components: {
    Calendar
  },
  props: {
    holiday: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    const store = useStore();
    const deleteHoliday= () =>{
      store.commit('sheduleMod/DELETE_HOLIDAY', props.index);
      localHolidays.splice(props.index,1)
    };
    const parseDate = (dateStr) => {
      if (!dateStr) return null;
      const [day, month, year] = dateStr.split('.').map(Number);
      return new Date(year, month - 1, day);
    };

    const formatDate = (date) => {
      if (!date) return '';
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    };

    const selectedDates = ref([
      parseDate(props.holiday.start),
      parseDate(props.holiday.end)
    ]);

    const handleDateChange = (dates) => {
      if (!dates || dates.length !== 2) return;
      
      const [start, end] = dates;
      emit('date-change', {
        index: props.index,
        start: formatDate(start),
        end: formatDate(end)
      });
      
    };

    return {
      selectedDates,
      handleDateChange,
      deleteHoliday
    };
  }
}
</script>

<style scoped>
.holiday-card {
  background: #fff;
  border-radius: 1rem;
  padding: 1.2rem 1.5rem;
  box-shadow: 0 10px 12px rgba(0,0,0,0.05);
  margin-bottom: 1.2rem;
  font-family: 'Inter', sans-serif;
  /* gap: 0.4rem; */
  position: relative;
  transition: transform 0.2s ease;
}

.holiday-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.priority-label {
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 0.5rem;
  display: inline-block;
  /* margin-bottom: 0.5rem; */
}

.priority-critical {
  background-color: #fee2e2;
  color: #b91c1c;
}
.priority-normal{
  background-color: #95c6a069;
  color:#368949;
}
.card {
  margin-top: 0.5rem;
}
.details-button {
  margin-top: 0.5rem;
  align-self: flex-end;
  background-color: #fee2e2;
  color: #b91c1c;
  font-weight: 600;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.6rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
</style>