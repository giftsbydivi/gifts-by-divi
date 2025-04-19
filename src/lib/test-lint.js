// This file is intentionally formatted poorly and has lint issues
// When you commit, Husky should run lint-staged to fix these issues

const testFunction = () => {
  const message = 'Hello, world!';

  // Unused variable
  const unusedVariable = 'This should be flagged by ESLint';

  console.log(message);

  return message;
};

export default testFunction;
