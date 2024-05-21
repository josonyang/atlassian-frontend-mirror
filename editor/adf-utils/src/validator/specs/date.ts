export default {
  props: {
    type: { type: 'enum', values: ['date'] },
    attrs: { props: { timestamp: { type: 'string', minLength: 1 } } },
    marks: { type: 'array', items: ['annotation'], optional: true },
  },
};
