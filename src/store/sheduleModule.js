export default {
  namespaced: true,
  state: () => ({
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
  // mutations: {
  //   SET_SHEDULE(state, shedule) {
  //     state.shedule = JSON.parse(JSON.stringify(shedule));
  //     localStorage.setItem('shedule', JSON.stringify(shedule));
  //   },

  //   CLEAR_SHEDULE(state) {
  //     state.shedule = JSON.parse(JSON.stringify(state.base));
  //     localStorage.removeItem('shedule');
  //     console.log(4)
  //   },

  //   INIT_SHEDULE(state) {
  //     const shedule = localStorage.getItem('shedule');
  //     if (shedule) {
  //       state.shedule = JSON.parse(shedule);
  //     }
  //   },
  //   ADD_BREAK(state, { dayIndex, breakItem }) {
  //     state.shedule[dayIndex].breaks.push(breakItem);
  // }
  // },
  mutations: {
    UPDATE_TIME(state, { dayIndex, field, value }) {
    state.shedule[dayIndex][field] = value;
  },
  
    UPDATE_BREAK(state, { dayIndex, breakIndex, field, value }) {
      state.shedule[dayIndex].breaks[breakIndex][field] = value;
    },
    SET_SHEDULE(state, shedule) {
      state.shedule = shedule;
      localStorage.setItem('shedule', JSON.stringify(shedule));
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
    localStorage.removeItem('shedule');
  },

  ADD_BREAK(state, { dayIndex, breakItem }) {
    state.shedule[dayIndex].breaks.push({
      start: breakItem.start || '14:00',
      end: breakItem.end || '15:00'
    });
  },
}
  
};
