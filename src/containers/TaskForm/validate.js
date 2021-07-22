const validate = (values) => {
  const errors = {};
  const { title } = values;
  if (!title) {
    errors.title = 'Please Input Title';
  } else if (title.trim() && title.length < 5) {
    errors.title = 'Title must be at least 5 characters';
  }
  return errors;
};
export default validate;
