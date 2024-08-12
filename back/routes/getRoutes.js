const router = require("express").Router(); // api path를 전달해 주는 메서드
const { getTasks } = require("../controllers/getTasks");

router.get("/get_tasks/:userId", getTasks); // 컨트롤러 함수 연결

module.exports = router; // router 모듈 내보내기
