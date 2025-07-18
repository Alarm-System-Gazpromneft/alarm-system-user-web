<template>
  <h2 class='mycenter' style="margin-top: 0px; color:white">Ваше pасписание:</h2>
  <div style="margin-left: 15px;">
  <div class="shedule-week mycenter">
    <div v-for="(day, dayIndex) in this.$store.state.sheduleMod.shedule.slice(0, 3)" :key="dayIndex" class="day-card">
      <h3>{{ day.day }}</h3>

      <div class="time-row">
        <label style="color: rgb(0, 116, 188);font-weight: bold; ">Начало:</label>
        <Calendar 
          :modelValue="parseTime(day.start)"
          @update:modelValue="handleTimeUpdate(dayIndex, 'start', $event)"
          hourFormat="24"
          timeOnly
          inputClass="custom-time-input"
          :defaultTime="day.start"
          dateFormat="yy-mm-dd"
        />
      </div>
      
      <div class="time-row">
        <label style="color: rgb(0, 116, 188);font-weight: bold; ">Конец:</label>
        <Calendar 
          :modelValue="parseTime(day.end)"
          @update:modelValue="handleTimeUpdate(dayIndex, 'end', $event)"
          hourFormat="24"
          timeOnly
          inputClass="custom-time-input"
          :defaultTime="day.start"
          dateFormat="yy-mm-dd"
        />
      </div>
      
      <div class="breaks-container">
        <h4 style="margin-top: 0px; color: rgb(0, 116, 188); margin-bottom: 15px">Перерывы: </h4>
        <div v-for="(breakItem, breakIndex) in day.breaks" :key="breakIndex" class="break-item">
          <Calendar 
            :modelValue="parseTime(breakItem.start)"
            @update:modelValue="handleBreakUpdate(dayIndex, breakIndex,'start', $event)"
            hourFormat="24"
            timeOnly
            :defaultTime="day.start"
            dateFormat="yy-mm-dd"
            inputClass="break-time-input custom-calendar"
          />
          <span>—</span>
          <Calendar 
            :modelValue="parseTime(breakItem.end)"
            @update:modelValue="handleBreakUpdate(dayIndex, breakIndex, 'end', $event)"
            hourFormat="24"
            timeOnly
            :defaultTime="day.start"
            dateFormat="yy-mm-dd"
            inputClass="break-time-input custom-calendar"
          
          />
          <button @click="removeBreak(dayIndex, breakIndex)" class="remove-btn">
            ×
          </button>
        </div>
        
        <button @click="addBreak(dayIndex)" class="add-break-btn">
          + Добавить перерыв
        </button>
      </div>
    </div>
    <div></div>
  </div>
  <div></div>
  <div class="shedule-week mycenter">
    <div v-for="(day, dayIndex) in this.$store.state.sheduleMod.shedule.slice(3)" :key="day.day" class="day-card">
        <h3>{{ day.day }}</h3>

      <div class="time-row">
        <label style="color: rgb(0, 116, 188);font-weight: bold; ">Начало:</label>
        <Calendar 
          :modelValue="parseTime(day.start)"
          @update:modelValue="handleTimeUpdate(dayIndex+3, 'start', $event)"
          hourFormat="24"
          timeOnly
          inputClass="custom-time-input"
          :defaultTime="day.start"
          dateFormat="yy-mm-dd"
        />
      </div>
      
      <div class="time-row">
        <label style="color: rgb(0, 116, 188);font-weight: bold; ">Конец:</label>
        <Calendar 
          :modelValue="parseTime(day.end)"
          @update:modelValue="handleTimeUpdate(dayIndex+3, 'end', $event)"
          hourFormat="24"
          timeOnly
          inputClass="custom-time-input"
          :defaultTime="day.start"
          dateFormat="yy-mm-dd"
        />
      </div>
      
      <div class="breaks-container">
        <h4 style="margin-top: 0px; color: rgb(0, 116, 188); margin-bottom: 15px">Перерывы: </h4>
        <div v-for="(breakItem, breakIndex) in day.breaks" :key="breakIndex" class="break-item">
          <Calendar 
            :modelValue="parseTime(breakItem.start)"
            @update:modelValue="handleBreakUpdate(dayIndex+3, breakIndex,'start', $event)"
            hourFormat="24"
            timeOnly
            :defaultTime="day.start"
            dateFormat="yy-mm-dd"
            inputClass="break-time-input custom-calendar"
          />
          <span>—</span>
          <Calendar 
            :modelValue="parseTime(breakItem.end)"
            @update:modelValue="handleBreakUpdate(dayIndex+3, breakIndex, 'end', $event)"
            hourFormat="24"
            timeOnly
            :defaultTime="day.start"
            dateFormat="yy-mm-dd"
            inputClass="break-time-input custom-calendar"
          
          />
          <button @click="removeBreak(dayIndex, breakIndex)" class="remove-btn">
            ×
          </button>
        </div>
        
        <button @click="addBreak(dayIndex+3)" class="add-break-btn">
          + Добавить перерыв
        </button>
      </div>
    </div>
    <div></div>
  </div>
  </div>
  <my-button class="mycenter exit-btn-container" @click="saveShedule" style="display: flex; align-items: center; background-color: rgb(37, 99, 235);border-radius: 8px; margin-bottom: 15px; margin-top: 15px;" >
    <div style="font-size: 17px; color:white;">Сохранить</div>
  </my-button>
</template>

<script>
import Calendar from 'primevue/calendar';

export default {
  name: 'week-form',
  components: {
    Calendar
  },
  data() {
    return {
      
    }
  },
  methods: {
    handleTimeUpdate(dayIndex, field, value) {
      const timeStr = this.formatTime(value);
      this.$store.commit('sheduleMod/UPDATE_TIME', {
        dayIndex,
        field,
        value: timeStr
      });
    },
    handleBreakUpdate(dayIndex, breakIndex, field, value) {
      const timeStr = this.formatTime(value);
      this.$store.commit('sheduleMod/UPDATE_BREAK', {
        dayIndex,
        breakIndex,
        field, 
        value: timeStr
      });
    },
    addBreak(dayIndex) {
      const newBreak = { start: '14:00', end: '15:00' };
      this.$store.commit('sheduleMod/ADD_BREAK', { dayIndex, breakItem: newBreak });
    },
    removeBreak(dayIndex, breakIndex) {
      this.$store.state.sheduleMod.shedule[dayIndex].breaks.splice(breakIndex, 1);
    },
    // this.$store.commit('sheduleMod/SET_SHEDULE',this.$store.state.sheduleMod.shedule)
  saveShedule() {
    this.$store.commit('sheduleMod/SET_SHEDULE', JSON.parse(JSON.stringify(this.$store.state.sheduleMod.shedule)));
  },
  parseTime(timeStr) {
    if (!timeStr) return null;
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  },
  formatTime(date) {
    if (!date) return '00:00';
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
},computed: {
  dayModel() {
    return {
      ...this.day,
      start: this.parseTime(this.day.start),
      end: this.parseTime(this.day.end),
      breaks: this.day.breaks.map(b => ({
        start: this.parseTime(b.start),
        end: this.parseTime(b.end)
      }))
    }
  }
}

  }
</script>

<style scoped>
.week-break {
  flex-basis: 100%; 
  height: 0px; 
}
.shedule-week {
  display: flex;
  gap: 20px;
  padding: 15px;
  padding-right: 0px;
  padding-left: 50px;
  overflow-x: auto;
  border-radius: 8px;
}

.day-card {
  min-width: 240px;
  padding: 15px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 20px rgba(0,0,0,0.1);
}

.time-row {
  display: flex;
  align-items: center;
  margin: 10px 0;
  gap: 10px;
}

.time-row label {
  width: 60px;
}

.breaks-container {
  margin-top: 15px;
  border-top: 1px dashed #eee;
  padding-top: 10px;
}

.break-item {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 8px;
}

.remove-btn {
  background: #ffebee;
  border: none;
  color: #c62828;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
}

.add-break-btn {
  width: 100%;
  padding: 6px;
  background: rgba(214, 225, 250, 0.556);
  border: 1px dashed rgb(0, 116, 188);
  color: rgb(0, 116, 188);
  border-radius: 4px;
  cursor: pointer;
  font-weight: 550;
  margin-top: 5px;
}

.add-break-btn:hover {
  background: #bbdefb;
}
:deep(.break-time-input.p-inputtext) {
  color: #2c3e50;
  /* font-weight: 500; */
  border: 0px solid #bdc3c7;
  background-color: rgba(214, 225, 250, 0.556);
}

:deep(.break-time-input.p-inputtext:focus) {
  box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.2);
  border-color: #3498db;
}
:deep(.custom-time-input.p-inputtext) {
  color: #2c3e50;
  /* font-weight: 500; */
  border: 0px solid #bdc3c7;
  background-color: rgba(214, 225, 250, 0.556);
}

:deep(.custom-time-input.p-inputtext:focus) {
  box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.2);
  border-color: #3498db;
}
:deep(.custom-calendar.p-inputtext) {
  width: 120px; /* Фиксированная ширина */
  min-width: 100%; /* Или на всю ширину родителя */
}
</style>