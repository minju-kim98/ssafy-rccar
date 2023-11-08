const express = require('express')
const pool = require("./DB");

const app = express()
const port = 3000

const cors = require("cors");
app.use(cors());

const morgan = require("morgan");
app.use(morgan("dev"));

app.use(express.json());
app.use("/public", express.static("public"));

const path = require("path");
const multer = require("multer");
const upload = multer({
	storage: multer.diskStorage({
		destination: (req, file, done) => {
			done(null, "public/");
		},
		filename: (req, file, done) => {
			console.log("test");
			// console.log(file);
			const ext = path.extname(file.originalname);
			// console.log(ext);
			const fileNameExeptExt = path.basename(file.originalname, ext);
			// console.log(fileNameExeptExt);
			const saveFileName = fileNameExeptExt + Date.now() + ext;
			console.log(saveFileName);
			done(null, saveFileName);
		},
	}),
	limits: { fileSize: 5 * 1024 * 1024 },
});

const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io');
const io = new Server(server, {
  cors:{
    origin: true
  },
  pingInterval: 100, //100 ms
  pingTimeout: 1
});



app.get('/', async (req, res) => {
  const ret = await pool.query("select * from sensing order by time desc limit 15");
  res.send(ret[0]); 
  console.log(ret[0]);
})

io.on("connection", async (socket) => {
  const ret = await pool.query("select * from sensing order by time desc limit 15");
  socket.emit("kfc", ret[0]);

  socket.on("bbq", (arg) => {
    console.log(arg);
  })
})


app.get("/api/companionship", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM companionship");
    return res.json(data[0]);
  } catch (error) {
    return res.json({
      success: false,
      message: "전체 호감도 목록 조회에 실패하였습니다.",
      error
    });
  }
});

app.get("/api/companionship/:id", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM companionship WHERE id = ?", [
      req.params.id,
    ]);
    console.log(data[0]);
    return res.json(data[0][0]);
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "호감도 조회에 실패하였습니다.",
    });
  }
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})