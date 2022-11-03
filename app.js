// const { createWorker } = require("tesseract.js");
// //const picture = require("./takePhoto");

// const worker = createWorker({
//   logger: (m) => console.log(m), // Add logger here
// });

// (async () => {
//   await worker.load();
//   await worker.loadLanguage("slv");
//   await worker.initialize("slv");
//   const {
//     data: { text, paragraphs },
//   } = await worker.recognize("photos/IMG_20221101_114142.jpg");
//   console.log(paragraphs);
//   //console.log(data, "inside app");
//   await worker.terminate();
// })();
