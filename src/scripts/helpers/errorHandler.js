export default function errorHandler(cb) {
  window.addEventListener('error', (error) => {
    console.log(error);
  });

  try {
    cb();
  } catch (error) {
    console.log(error);
  }
}
