const express = require("express"); // express 모듈 불러오기
const cors = require("cors"); // cors 모듈 불러오기
const PORT = "8080"; // 포트 번호 설정
const database = require("./database/database");

const app = express(); // express 모듈을 사용하기 위해 app 변수에 할당한다.

// const corsOptions = {
//     origin
// }

// const corsOptions2 = ['']

app.use(cors()); // http, https 프로토콜을 사용하는 서버 간의 통신을 허용한다.
app.use(express.json()); // express 모듈의 json() 메소드를 사용한다.

app.get("/", (request, response) => {
  response.send("Hello Mings");
});

// app.get("/get_tasks", async (req, res) => {
//   try {
//     const result = await database.query("SELECT * FROM task");
//     return res.status(200).json(result.rows);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

app.use(require("./routes/getRoutes"));

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
