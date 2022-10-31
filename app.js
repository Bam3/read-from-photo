Tesseract.recognize("/photos/IMG_20221031_212502.jpg", "slv", {
  logger: (m) => console.log(m),
}).then(({ data: { text } }) => {
  console.log(text);
});
