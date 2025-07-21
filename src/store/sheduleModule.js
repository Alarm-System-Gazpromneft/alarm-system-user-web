export default {
  namespaced: true,
  state: () => ({
    holidays: [],
    shedule: [
        { 
          day: 'Пн', 
          start: '09:00', 
          end: '18:00',
          breaks: [
            { start: '13:00', end: '14:00'}
          ] 
        },
        { 
          day: 'Вт', 
          start: '09:00', 
          end: '18:00',
          breaks: [
            { start: '13:00', end: '14:00'}
          ] 
        },
        { 
          day: 'Ср', 
          start: '09:00', 
          end: '18:00',
          breaks: [
            { start: '13:00', end: '14:00'}
          ] 
        },
        { 
          day: 'Чт', 
          start: '09:00', 
          end: '18:00',
          breaks: [
            { start: '13:00', end: '14:00'}
          ] 
        },
        { 
          day: 'Пт', 
          start: '09:00', 
          end: '18:00',
          breaks: [
            { start: '13:00', end: '14:00'}
          ] 
        },
        { 
          day: 'Сб', 
          start: '09:00', 
          end: '18:00',
          breaks: [
            { start: '13:00', end: '14:00'}
          ] 
        },
      ],
    base: [
        { 
          day: 'Пн', 
          start: '09:00', 
          end: '18:00',
          breaks: [
            { start: '13:00', end: '14:00'}
          ] 
        },
        { 
          day: 'Вт', 
          start: '09:00', 
          end: '18:00',
          breaks: [
            { start: '13:00', end: '14:00'}
          ] 
        },
        { 
          day: 'Ср', 
          start: '09:00', 
          end: '18:00',
          breaks: [
            { start: '13:00', end: '14:00'}
          ] 
        },
        { 
          day: 'Чт', 
          start: '09:00', 
          end: '18:00',
          breaks: [
            { start: '13:00', end: '14:00'}
          ] 
        },
        { 
          day: 'Пт', 
          start: '09:00', 
          end: '18:00',
          breaks: [
            { start: '13:00', end: '14:00'}
          ] 
        },
        { 
          day: 'Сб', 
          start: '09:00', 
          end: '18:00',
          breaks: [
            { start: '13:00', end: '14:00'}
          ] 
        },
      ]
  }),
  mutations: {
    SET_HOLIDAYS(state,holidays){
      state.holidays = holidays;
      localStorage.setItem('holidays', JSON.stringify(holidays));
    },
    ADD_HOLIDAY(state,holiday,commit){
      state.holidays.push(holiday)
      localStorage.setItem('holidays', JSON.stringify(state.holidays))
    },
    UPDATE_TIME(state, { dayIndex, field, value }) {
    state.shedule[dayIndex][field] = value;
  },
  
    UPDATE_BREAK(state, { dayIndex, breakIndex, field, value }) {
      state.shedule[dayIndex].breaks[breakIndex][field] = value;
    },
    UPDATE_HOLIDAY(state, { index, holiday }) {
      state.holidays.splice(index, 1, holiday);
      localStorage.setItem('holidays', JSON.stringify(state.holidays));
  },
    SET_SHEDULE(state, shedule) {
      state.shedule = shedule;
      localStorage.setItem('shedule', JSON.stringify(shedule));
  },
  DELETE_HOLIDAY(state, index) {
    state.holidays.splice(index, 1);
  },
  INIT_SHEDULE(state) {
    try {
      const savedShedule = localStorage.getItem('shedule');
      if (savedShedule) {
        const parsed = JSON.parse(savedShedule);
        state.shedule = parsed.map(day => ({
          day: day.day || 'День',
          start: day.start || '09:00',
          end: day.end || '18:00',
          breaks: (day.breaks || []).map(br => ({
            start: br.start || '13:00',
            end: br.end || '14:00'
          }))
        }));
      } else {
        this.commit('sheduleMod/CLEAR_SHEDULE');
      }
      const savedHolidays = localStorage.getItem('holidays');
      if (savedHolidays) {
        state.holidays = JSON.parse(savedHolidays);
      }
      // fvrgjntvvvvvvvvvvvvvnjjvnfvfvfvr
      else{
        state.holidays = [
      {
        type: 'Больничный',
        start: '20.06.2025',
        end: '27.06.2025'
      },
      {
        type: 'Отпуск',
        start: '29.06.2025',
        end: '1.07.2025'
      }
    ];
      }
    } catch (e) {
      console.error('Ошибка при загрузке расписания:', e);
      this.commit('sheduleMod/CLEAR_SHEDULE');

    }
  },

  CLEAR_SHEDULE(state) {
    state.shedule = state.base.map(day => ({
      day: day.day,
      start: '09:00',  
      end: '18:00',    
      breaks: day.breaks.map(br => ({
        start: '13:00',
        end: '14:00'
      }))
    }));
    state.holidays=[
      {
        type: 'Больничный',
        start: '20.06.2025',
        end: '27.06.2025'
      },
      {
        type: 'Отпуск',
        start: '29.06.2025',
        end: '1.07.2025'
      }
    ];
    localStorage.removeItem('shedule');
    localStorage.removeItem('holidays')
  },

  ADD_BREAK(state, { dayIndex, breakItem }) {
    state.shedule[dayIndex].breaks.push({
      start: breakItem.start || '14:00',
      end: breakItem.end || '15:00'
    });
  },
}
  
};
